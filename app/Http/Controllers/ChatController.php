<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\Request;
use Aws\LexRuntimeService\LexRuntimeServiceClient;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    private $botConfig;
    private $senderBotName;
    private $senderBotId;

    public function __construct()
    {
        $this->botConfig = [
            'region'   => env("AWS_DEFAULT_REGION"), //ap-southeast-1
            'version'  => 'latest',
            'botName'  => 'self_service_lex_bot', //required
            'botAlias' => 'quickstart',           //required
        ];
        $this->senderBotName = 'lexbot';
        $this->senderBotId = 'lexbot';
    }

    public function init(Request $request)
    {
        $lexRuntimeServiceClient = new LexRuntimeServiceClient($this->botConfig);

        $userId = Auth::id();
        $this->botConfig['userId'] = 'client-' . $userId;
        $newSessionData = $lexRuntimeServiceClient->putSession($this->botConfig);

        // dd($this->botConfig);

        $messages = Chat::create([
            "session_id"  => $newSessionData["sessionId"],
            'message'     => "Hi",
            'sender_name' => $this->senderBotName,
            'sender_id'   => $this->senderBotId,
        ]);

        return response()->json([
                "dialogState" => $newSessionData["dialogState"],
                "messages"    => [$messages],
                "slots"       => $newSessionData["slots"],
            ], Response::HTTP_OK);
    }

    public function send(Request $request)
    {
        $lexRuntimeServiceClient = new LexRuntimeServiceClient($this->botConfig);

        $newMessage = $this->botConfig;
        $newMessage['inputText'] = $request->message;
        $newMessage['userId'] = 'client-' . Auth::id();

        $returnMessage = $lexRuntimeServiceClient->postText($newMessage);

        //dd($returnMessage);

        $newMessage = [
            [
                'message'     => $request->message,
                'sender_id'   => Auth::id(),
                'sender_name' => Auth::user()->name,
                "session_id"  => $returnMessage['sessionId']
            ],
        ];
        if ($returnMessage["dialogState"] != "ReadyForFulfillment") {
            $newMessage[] =
                [
                    'message'     => $this->makeUrltoLink($returnMessage["message"]),
                    'sender_name' => $this->senderBotName,
                    'sender_id'   => $this->senderBotId,
                    "session_id"  => $returnMessage['sessionId']
                ];
        }

        $messsages = [];
        foreach ($newMessage as $key => $value) {
            $messsages[] = Chat::create([
                "session_id"  => $returnMessage["sessionId"],
                'message'     => $value["message"],
                'sender_id'   => $value["sender_id"],
                'sender_name' => $value["sender_name"],
            ]);
        }

        // return [
        //     "dialogState" => $returnMessage["dialogState"],
        //     "slots"       => $returnMessage["slots"],
        //     "messages"    => $messsages
        // ];

        return response()->json([
            "dialogState" => $returnMessage["dialogState"],
            "slots"       => $returnMessage["slots"],
            "messages"    => $messsages
        ], Response::HTTP_OK);
    }
    public static function makeUrltoLink($string) {
        // The Regular Expression filter
        $reg_pattern = "/(((http|https|ftp|ftps)\:\/\/)|(www\.))[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\:[0-9]+)?(\/\S*)?/";
        
        // make the urls to hyperlinks
        return preg_replace($reg_pattern, '<a href="$0" target="_blank" style="color:blue !important;" rel="noopener noreferrer">$0</a>', $string);
    }
}
