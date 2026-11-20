# payjp-event-mock-server

PAY.JP の Webhook イベントをモックで任意の URL に送る GUI。依存なし (Node 22.11+)。

```
node server.js
# -> http://localhost:8787
```

1. Webhook URL と `X-Payjp-Webhook-Token` を入力 (localStorage に保存)
2. 左のイベント一覧から選ぶとテンプレ JSON が出る
3. `<ch_ID>` `<UNIXTIME>` などの placeholder を書き換える (どうでもいい箇所は「ダミー値で埋める」ボタン)
4. 「送信」→ 下にレスポンスが出る。placeholder が残っていると送信されず、残っている行が一覧で出る

テンプレは `templates.json` (docs.pay.jp の各オブジェクト例ベース)。編集すればそのまま反映。
