# COVID-19 Dashboard

React18を使用したCOVID-19データの可視化ダッシュボードです。

## 機能

- 📊 COVID-19の最新統計データの表示
- 📈 歴史的データの時系列グラフ
- ⚡ SWRライブラリによる効率的なデータフェッチ
- 🎨 ダークモードテーマ
- 🔄 Suspenseを使用したローディング状態の管理

## 技術スタック

- **React 19.1.0** - フロントエンドフレームワーク
- **TypeScript** - 型安全性
- **SWR** - データフェッチライブラリ
- **Recharts** - グラフ描画ライブラリ
- **React Suspense** - ローディング状態管理

## 使用API

- `https://disease.sh/v3/covid-19/all` - 最新の全世界統計
- `https://disease.sh/v3/covid-19/historical/all?lastdays=all` - 歴史的データ

## セットアップ

```bash
# 依存関係のインストール
yarn install

# 開発サーバーの起動
yarn start

# ビルド
yarn build

# テスト実行
yarn test
```
