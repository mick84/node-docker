
build:
	docker build -t node-app .

# -e is --env variable. Log is: "App is running on port 4000"
run:
	docker run  -v D:\web-development\projects\node-docker:/app -v modules:/app/node_modules --env-file ./.env -p 3000:4000 --rm -d --name node-app node-app

#:ro - readonly! There will be impossible to change files on local machine from inside docker container via exec -it!
run-readonly:
	docker run  -v D:\web-development\projects\node-docker:/app:ro -v modules:/app/node_modules  -p 3000:3000 --rm -d --name node-app node-app
stop:
	docker stop node-app
dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
dev-build:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
# -v: will destroy volume: actual only for dev-mode!
dev-rm-vol:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v
dev-rm:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down 
prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
prod-rm:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml down

