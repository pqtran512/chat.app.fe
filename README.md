# First init

run: "npm i" để download những packages cần thiết

# Chạy project

run: "npm run start"

# UI Component

xem: https://mui.com/material-ui/getting-started/

# build and deploy
build project: (trước khi build nhớ vào chỉnh lại version trong file .env tương ứng)
- staging: npm run build:staging (file .env.staging)
- production: npm run build:prod (file .env.production)

build docker: docker build -t kientrucphanmem/web:tag . (tag là version)

zip docker image: docker save -o kientrucphanmem_web_tag.tar kientrucphanmem/web:tag (tag là version)

send zipped docker image to server: scp ./kientrucphanmem_web_tag.tar host:~/kientrucphanmem/docker-images

push docker: docker push hub.bmes.vn/cms-fe:tag (tag là version)