---
title: '[メモ]りあクト！Firebase で始めるサーバーレス React 開発'
date: '2022-01-02'
---

# 1

git commit 時に発生する Git フック「pre-commit」を husky でハンドリング

lint-staged で Git のステージに上がっているファイルを対象に eslint 等のコマンドを実行できる

本番
rules_version = '2';
service cloud.firestore {
match /databases/{database}/documents {
match /{document=\*\*} {
allow read, write: if false;
}
}
}

firebase init で、
firebase.json と.firebaserc という二つの設定ファイルを作
成。加えて Firestore のインデックスファイル firestore.indexes.json とセキュリティルール
ファイル firestore.rules も作成する

.eslintrc.js から quotes, prefer-arrow のルールを無効化

# 2

データベース初期化用のデータを seed データと呼ぶ

firestore に対して、どうしても SQL が使いたければ、ドキュメントデータを BigQuery にコピーしてやればいい

JOIN: 複数のテーブルの結合を行いたいときに使用する命令

コレクシション、複数のドキュメントの一括削除は Firebase CLI から行う

# 3

Cloud Functions はサーバーレスな関数の実行環境

Cloud Functions for Firebase は、Google Cloud Platform のサービス群のひとつである Cloud Functions と比較して、Firebase の各機能とより統合・最適化されてる

Cloud Functions for Firebase の提供する主な関数トリガー

- Cloud Firestore トリガー
- Firebase Authentication トリガー
- Cloud Storage トリガー
- Cloud Pub/Sub トリガー（スケジュール起動）
- Firebase 向け Google アナリティクストリガー
- HTTP トリガー

Cloud Functions の関数は、src/index.ts に処理を書いてエクスポートするだけで作れる

GOOGLE_APPLICATION_CREDENTIALS=./src/mangarel-demo-firebase-adminsdk.json firebase serve --only functions --project mangarel-demo-676e3

VSCode で tsc のウォッチタスクを起動していれば、cloud functions のローカルサーバもホットリロードが効くようになってるよ。だから開発中は立ち上げっぱなしでもいい

データモデル: 現実世界の対象をデータ集合として表現するため、対象を表す情報を抽象化して一定の構造や形式で記述したもの

スキーマ: データベースにどのような種類のデータをどのような構造で格納するか定義したもの（型？）

冪等性: その関数を１回実行しても、４回・５回と繰り返し実行し
ても結果が同じことが保証されている

Cloud Functions で作成する関数は冪等であるべきというのは公式が推奨してる（Firestore トリ
ガー関数なんかは、何かの拍子に二回起動してしまうことが普通にある）

スケジュール設定関数や Firestore トリガー関数
をローカルで実行したいときは Functions Shell というツールを使う

Functions Shell は、Cloud Functions のローカル実行状況なのは firebase serve と 同じだが、HTTP 関数以外の関数もシェルから実行できる

Node アプリケーションなのでブラウザの fetch は使えないから、外部 API にアクセスするところは node-fetch を使う

Firestore のクエリには『 == 』で表現される等価評価と、
『 < 』
『 <= 』
『 > 』
『 >= 』範囲比較の二種類がある

ドキュメントのフィールドの範囲比較を実行するためには、そ
のフィールドについての昇順と降順それぞれのインデックスが必要だが、
そのフィールドだけに
適用される単一インデックスは Firesotre が自動で生成してくれる

任意のフィールドの範囲比較を他のフィールドの等価評価と組み合わせる場合、複合インデック
スというものが必要になる

データベースにおけるインデックスとは、目的のレコードを効率よく取得するための「索引」のことです。テーブル内の特定の列を識別できる値（キー値）と、キー値によって特定された列のデータが格納されている位置を示すポインタで構成されています

書籍内のトピックをページ番号に対応付ける書籍の索引（インデックス）と同様に、データベースのインデックスはデータベース内のアイテムをデータベース内の場所にマッピングします
データベースにクエリが送信される際、データベースはインデックスを使用して、リクエストされたアイテムの場所をすばやく検索します。

Cloud Firestore では、すべてのクエリに対してインデックスを使用することで、クエリの高パフォーマンスを確保するので、結果的にクエリのパフォーマンスは、データベース内のアイテム数ではなく、結果セットのサイズに依存することになります。

最も基本的なクエリに必要なインデックスは、自動的に作成されます。

## 単一フィールド インデックス

単一フィールド インデックスは、特定の 1 つのフィールドを含む、コレクション内のすべてのドキュメントの並べ替え済みマッピングを保持します。
単一フィールド インデックスの各エントリには、ドキュメント内の特定のフィールドの値と、そのドキュメントのデータベース内での位置が記録されます。

api.ts

```ts
forEach(searchParams, (v, k) => {
  const value = String(v || '').trim();
  if (k === 'publisherName') {
    if (v === 'kodansha') queries.set(k, '講談社');
  } else if (value) queries.set(k, value);
});
```

ダンプ: ファイルやメモリの内容をディスクに出力すること

cloud functions での実行環境の判別は、process.env.node の値をみて判断するのが良い？
process.env.node に nodenv が含まれていれば、開発環境

```js
export const isDevelopment = () => (process.env.node || '').includes('nodenv');
```

```js
export const fetchCalendar = functions.pubsub.schedule('0 2 1,10,20 * *').timeZone('Asia/Tokyo');
```

は、タイムゾーンが設定されてるのはスケジューラの起動時間だけで、
cloud functions のホストサーバ自体のタイムゾーンは GMT のままで、変更されないので、
cloud functions で日付系を扱う際は、タイムゾーンが設定できる date-fns-timezone 等を使えばローカルマシンと、ホストマシンの時間差がなくなる

react 本体と functions でコードを共有するために、React アプリのほうを本体にして、Cloud Functions のほうはそこに向けてシンボリックリンクを張る

Cloud Functions が起動されると環境変数 process.env.FUNCTION_TARGET にその関数名が入る
cloud functions の関数を呼び出すたびに cloud functions が起動している？

# 4

NoSQL では、RDB で言うレコードのジョインができないので、非正規化して、必要なデータをドキュメントに重複して持たせる

単一フィールドインデックスは、それぞれ別々の昇順と降順、配列専用のインデックスの三種類

ひとつのクエリーで範囲比較と等価評価
を同時に行おうとすると、そのフィールドの組み合わせの複合インデックスが必要になる

コレクショングループインデックス: コレクションをまたがて同じ名前のサブコレクションを検索するためのインデックス

Firestore のインデックスの挙動が RDB と異なるのは、コレクションを全削除してもインデッ
クスは残っていること

RDB ではインデックスはスキーマの中に組み込まれ
ているけど、Firestore はスキーマレスだから、コレクションとドキュメントフィールドの名前によって、システ
ムの中に独立して作られてる

Firestore の配列について用意されているオペレーション

- array-contains: 配列の検索
- arrayUnion(): 配列要素の追加
- arrayRemove(): 配列要素の削除

ひとつのクエリーの中で範囲比較はひとつのフィールドにしか適用でき
ないので、検索用にフラグ等の値をドキュメントに持たせた上でそれを適宜更新したりし
て、範囲比較が常に１フィールドだけに収まるようにしないといけない

Date オブジェクトを突っ込むと自動的にその firebase.firestore.Timestamp 型に
変換してくれる

FieldValue.serverTimestamp() の
返す値が Timestamp 型じゃなく、FieldValue 型が返される

## ベースとして RDB、さらには Rails の ActiveRecord の流儀を firestore に流用した際の、firestore 設計のベストプラクティス？

- リレーションを外部 ID フィールドによって表現する
- createdAt や updatedAt などのタイムスタンプ値をドキュメントに持たせる
- コレクション名を複数形で表記する
- 必要がない限りはコレクションはできるだけルートに置いて、むやみに階層化しない
- ID についてはシステムでユニークに定義できるものがあればできるだけそれを使う(ISBN など)
- セキュリティレベルでドキュメントを分割する(公開プロフィール情報、個人情報は別ドキュメントにする等)
  - Firestore ではセキュリティルールを適用できるのはフィールド単位ではなくドキュメント単位という特性があるため
- N+1 問題を発生させないために、表示に必要な情報は重複を恐れず非正規化してドキュメントに持たせる
  - 非正規化した部分にどうしてもオリジナルのデータ変更を迅速に追随したい場合は、Cloud Functions の Firestore トリガー関数を使う
- ひとつのクエリーで範囲比較が複数にならないように、適宜フラグを持たせる
  - 例えば、books コレクション で発売済みの単行本だけを抜き出したい場合、クエリーで publishedOn の値を直に比較するんじゃなく、isPublished のようなフラグ値を持たせておいて、毎日午前 0 時に Cloud Functions のスケジュール設定関数でそのフラグ値を更新する、といったオペレーションにする
- 以上のことを考慮した上で、それでもできるだけドキュメントを小さくシンプルに保つ
  - フィールド数が多くなればなるほど、セキュリティルール内でユーザーによるドキュメントの作成・更新時のバリデーションを実装するのが複雑になってしまうので、不必要なデータは持たせたくない。別ドキュメントやサブコレクションに分割することも考えながら、できるだけフィールド数を少なく、その中身の値もシンプルに保ちたい

## Firestore でリレーションをどう実現するか

- 『1 : 1』: 疑似リレーション(別のコレクションドキュメントでありながら、対応する同じ ID を共有しているということ)
- 『1 : N』: 外部 ID フィールドを持たせればいい
  - リレーション先のドキュメントがサブコレクションにある場合はドキュメント ID では
    なく、参照型でファレンスパスの文字列をそのまま入力して参照するのが良い（そうじゃないとどのドキュメントの下にあるのかがわからなくなるので）
- 『N : N』: True マップを使うのが現時点では much better
  - 配列フィールドを使いたいところだけど、array-contains が１クエリーに１回しか使えないという制限があるので、それを避けたい場合は True マップに行き着く

## firebase で全文検索を行う

algolia
他のフィールドと併せてフィルタリング
できない。例えば検索文字列に合致しつつ、未発売のタイトルだけを抽出したいとか。

形態素というのは意味が通る最小の言語単位のことで、文
章をその単位に分類・分解するから『形態素解析』と呼ばれる

N-gram: テキストを単語ではなく、N 数の隣り合う文字列に分解する方法だよ。N の数が２なら bi-gram（バ
イグラム）
、３なら tri-gram（トリグラム）とも言う

bi-gram で分解された要素を索引として配列に格納しておけば、検索文字列に『七
つ』や『大罪』を渡されたときにマッチングできる

```js
// n-gramで分解
const words = [' 七 つ ', ' つ の ', ' の 大 ', ' 大 罪 '];

let query = db.collection('books').limit(10);
words.forEach((token) => {
  // ループを重ねるほど絞り込まれていく
  query = query.where(`tokenMap.${token}`, '==', true);
});

const snap = await query.get();
```

firebase functions:config:set locale.region="asia-northeast1" locale.timezone="Asia/Tokyo" rakuten.app_id="1005832755143203352" --project mangarel-demo-676e3

n-gram true マップ手法の全文検索は、orderBy('publishedOn')等でソートができない（比較演算子によるフィルタリングも結果としてソートが伴うので出来ない？）ので、
必要な場合は、Client side sorting で対応する

n-gram true マップ手法の全文検索のメリット
外部サービスを使わないので取り回しが楽なことと
クエリーで他のフィールドの等価評価によるフィルタリングができること

# 5

state を定義して、それがどういった状況の際にどのような処理を行うかをカスタムフックにまとめて切り出す

# 6

初
期段階では、完成度が低くて多少不便でも、提供するニッチな価値を評価して熱心に使ってくれる少
数のユーザーといっしょになってプロダクトをブラッシュアップしていくべき

API Key: 6xtPLTxvz6CmPYZ661oxpti2j
API Key Secret: oriurhQFPjqVKPDa404nN8EIdg4nVPgZXyVGb0Oa30XTcb27Nu
Bearer Token:AAAAAAAAAAAAAAAAAAAAAKWfXgEAAAAAG%2FBgjFhZbC%2F6eTF2gyWixU%2Fmz8s%3DUeE6cDuM5Oi9SLvnvXnYgBajupOSKZIffrLdpnFfV2BPrUmn2Y

firebase auhentication は、ローカルサーバでの実行と違っ
て、Chrome DevTools とかで明示的に毎回キャッシュを消さないと前のが部分的に残ったまま理解不
能な動きをすることもあるから気をつける必要がある

auth.currentUser()は結果が遅延するらしく、アプリ
起動直後には認証情報が取得できない

テストモードは、その気になればアプリから API キーは抜き出せるから、悪意の第三者が Firestore のデータをいくら
でも書き換えられちゃう

セキュリティールールの構文は、まず
match でドキュメントのパスを指定
した内部で
allow <適用ルール>: if <条件>;
という文法で記述する

適用ルールは以下の五種類

- get …… 個別のドキュメントの取得
- list …… ドキュメントのリストでの取得
- create …… ドキュメントの作成
- update …… ドキュメントの更新
- delete …… ドキュメントの削除

get と list は read に、 create と update と delete は write にまとめることができる

firestore ルールを本格的に開発するときは、ちゃんとテストを書いた上でローカルエミュレータで検証する方法（https://firebase.google.com/docs/firestore/security/test-rules-emulator?hl=ja）がある

セキュリティルールはこんなふうに、単純なアクセス権限の設定だけじゃなく書き込み時のデータのバリデーションやスキーマチェックにも適用される

.size() というのはたぶんそのドキュメントのフィールド数ですよね。 in でそのフィール
ドが存在しているかを検証して、 is で型チェックをしてる
