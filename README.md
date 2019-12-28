Urmart
======

[![pipeline status](https://gitlab.com/marco79423/urmart/badges/master/pipeline.svg)](https://gitlab.com/marco79423/urmart/commits/master)

## 前言

網址：http://urmart.marco79423.net

這是我開發的一個購物網站的小專案，一方面是練習，另一方面也是技能展示。

這個專案練習佔了不少的比重，所以我會盡可能的嘗試使用比較新的技術開發，好比說我很久沒使用 Django 了 (後來我改用 Flask 和現在的 golang)，我最後一次使用還是 1.x，現在不知不覺就已經到了 3.0 了，所以這次我就直接跳到了 3.0 版本，又比如我先前一直都是使用 Fabric 1.x，但這次就直升 Fabric 2.x 了。

另一方面，除了練習，也還包含技能展示的部分，所以我會「用牛刀殺雞」，其實這個專案應該不需要搞這麼複雜，但因為一些「不可告人」的目的，所以就搞成這樣了。

## 專案架構

專案分為三個部分，分別是前端(frontend/)、後端(backend/) 和佈署 (deploy/)

    .gitlab-ci.yml      # CI/CD 的腳本

    frontend # 前端 Server
        src/
            index.js    # 程式進入點
            App.js      # React component 進入點
            config.js   # 設定相關
            ducks.js    # 主要邏輯位置
            apis.js     # 使用的 API
            components/
    
    backend/ # 後端 API Server
        entry_point.js  # 程式進入點
        urmart/
            views.js   # View
            tasks.js   # Celery 排程任務
            models/    # Model
            sqls/      # 使用到的 SQL
        backend/
            settings.py
            
    deploy/  # 佈署相關的功能
        deploy.py           # 程式進入點
        docker-compose.yml  # Service 配置設定
        nginx.conf          # 所使用的 nginx 設定檔

### 佈署相關

專案使用 gitlab-ci 來做 CI/CD，實作放在 .gitlab-ci.yml，裡頭包含測試、建置 Docker image、佈署到 AWS 等功能。

每次有新的 git commit，佈署的腳本就會分別讓前端、後端建置一份 Docker image 並推送到 Docker Hub。

* 前端的 Image： [marco79423/urmart-frontend](https://hub.docker.com/r/marco79423/urmart-frontend)
* 後端的 Image： [marco79423/urmart-backend](https://hub.docker.com/r/marco79423/urmart-backend)

目前 Server 我是放在 AWS 的一台 EC2 上，所以佈署的腳本接著會將 deploy/ 打包複製到目標機器上，然後透過 docker-compose 啟動所有服務。

### 前端相關

前端使用 create-react-app 配合 redux / redux-saga 開發，UI 的部分則直接使用了之前一直很想嘗試的 antd。

### 後端相關

後端則是使用 Django，並搭配 Celery 做排程，其中下載 csv 報表的功能就是用這個做的。
