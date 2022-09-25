export default {
    fileSystem: {
        path: './DB'
    },
    mongodb: {
        cnxStr: 'mongodb+srv://jorgera:Coderhouse123@cluster0.gx743pf.mongodb.net/ecommerce?retryWrites=true&w=majority',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    firebase: {
        "type": "service_account",
        "project_id": "coderhouse-ecommerce-f78ea",
        "private_key_id": "76829b966a5283aeb1062bbd3391ddc103da73c3",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC98XZ+QhcdmZM0\ncIfAJjtp49pe9N6s9gWDmONB5WaVSs4X6lCxxQPO/ii/AefOyKhvezlWoG52ZrlT\n1MSvaFFmjGQxvC76sUUtVUcChJwDdy4+rn4qS3kWnMjvDNYJgCN2R+PwgumBTJSc\nEcXeJ7qRtSflRrhM9kXX/vBaMCf+NKnVswaZ9UGJSlQpabXAcG6Zoc52+fOGw5yZ\nXL14i3Cp8Yyc2gA54/NoZLxpIr0z9Zz/IsASa4uQxQ0Pvsnzbi/70wC5ZlvKqx+I\n6xiXzppdKBdeYTJb3QT2PWvFpTsbJeCt9cyUVziBnVU0RLvS03MJCTUrjIJXzRgF\nhhTRw78XAgMBAAECggEABDH6m4RLLWiwcyaPIQPXKRoSvykqZ+iRK5xrXI+8Cc0a\nqzWOLbb7xA0iCkH5BDyzV68Bj7PAbNYM/tiCtZsYvSqZpe2RnhDfRcaN6HTUW1E9\nEL5a5AVBuemhmIIQkiol3l1tH+lMTgJKf/32gFchTEmThYFf3bdMyJ4FYgCRSZCH\nZQfwOa2Y4S8W/L61IpolQB0VYOv6UbniM/Q6nUZl+oOz22dsqTTEymRrypZBvNk/\nIKlA7Rc7hocWzowcj/glFtMgGsIWD+oCE5tPoM2D5VjAMFoJss5iTorFDqNlOTmS\nBaLARqFTaFri7WLyT0YE90PR19KwOnWfPiNRPhjahQKBgQD5gueN9AAuyqc+6y3P\nJmCAwVuDR6bdnnW8ntgnE1x86aAiW3qXEh3SjVmMAiX1+siZf6f3xDi+AWlFyTGB\ni82mXXqFYDrdpyoVUQOlsLGBw/adHwRr5hPLp7RxnPz93UjmsqiZBrR88WMxoH8y\n/ZZY+dF/ibZjTfbFl3dybUxwfQKBgQDC4f1jUQJTxzhR2IHHxiNozYQEnj0zfq9V\n4dvEBghDnhBxZjKQ7M3/wUYMw6bbXcm2fkM76KeYokMMOb6EnDSOZifb2B6GihGI\nj+j/v7zZ1rak8LWjByXJz83BwgASr7T2lbzQRO36fgwbN3mKNXqbBq2Qu3mduuWs\nOiOc7M42IwKBgHOQL9NNmfASKJg5sQPq0HOSGuKZAy5OQFXWdGLU0teAFY0UNZlW\n6L0mfr0cGZzuRI7j01YsaeOHH80UvHs111Agp6iyw1D6JcGtvjS1u+FQdB6dyRx4\ned6vlCGzBnJGVYeUZAZMVrgvzTOlFIT3cvVO77tUe0dPSuaFmutCuE65AoGAJyXY\njdPfIM87PA2+/E+MG2h1ZawX5TlEpX7qc7U2gcbFzNHXxI8dTowXs0a2RQjRFWzF\nusogqKOnzlPnNqJeWGCjDyGZ+DLSFNm712w/1o6wP+/uvOIZsDGjRpHfC+Hp+0LX\nHAtMtu4NJoZ9TssxZuTvhsxyQMIjkvZW4xYa0nsCgYB1Mfx/RUpUTBzPL1c3OeAU\nUen9HAQRlwJd8pK0S+6gHIF7Y9MFZ4hBrHJ0iPUt7GLkxgnBoVflwLbJIhFOvb+1\nnvSxgZFda8887K6hvIZKHuYOjXvSJvmHc0g3uISNMKQ8bRgLiZVU1o07heL8nZAh\nWupBGvA8zAYoalibAY/7eg==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-6h8zh@coderhouse-ecommerce-f78ea.iam.gserviceaccount.com",
        "client_id": "113923176644658761209",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6h8zh%40coderhouse-ecommerce-f78ea.iam.gserviceaccount.com"
      },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: `./DB/ecommerce.sqlite`
        },
        useNullAsDefault: true
    }
}