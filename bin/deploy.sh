echo 'start'
docker start 4ccd &&
cd /home/mingzheng_paul_wang/app &&
git pull &&
yarn install --production=false &&
yarn build &&
yarn migration:run &&
docker kill app&&
docker rm app &&
docker build -t lichen404/next-blog . &&
docker run  --name app --network=host -p 3000:3000 -d lichen404/next-blog
echo 'OK!'

