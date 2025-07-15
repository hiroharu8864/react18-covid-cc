# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## アプリケーション

* https://disease.sh/v3/covid-19/all
* 上記APIの結果をフロントエンドReact上でグラフ表示する。グラフのタイトルは「covid-19罹患者数」
* APIのライブラリには、「swr」を採用すること
* APIのデータ取得の間は、ReactのSuspenseタグで表示中のローディング画面を実装する
* グラフの表示時には「react-countup」ライブラリを利用して、動きを出して欲しい
* APIのレスポンスをTypeScriptの型定義で確認する

## 指示内容

* https://disease.sh/v3/covid-19/all 上記APIの結果をフロントエンドReact上でグラフ表示できるようにしてください
* APIのライブラリを「swr」に変更してください
* https://disease.sh/v3/covid-19/historical/all?lastdays=all の内容をグラフとして追加してください。
