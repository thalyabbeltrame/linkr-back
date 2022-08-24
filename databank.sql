CREATE TABLE "users" (
    "id" serial NOT NULL,
    "username" TEXT NOT NULL UNIQUE,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "picture_url" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);
CREATE TABLE "posts" (
    "id" serial NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    "user_id" integer NOT NULL,
    CONSTRAINT "posts_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);
CREATE TABLE "hashtags" (
    "id" serial NOT NULL,
    "name" TEXT NOT NULL UNIQUE,
    CONSTRAINT "hashtags_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);
CREATE TABLE "hashtags_posts" (
    "id" serial NOT NULL,
    "post_id" integer NOT NULL,
    "hashtag_id" integer NOT NULL,
    CONSTRAINT "hashtags_posts_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);
CREATE TABLE "likes" (
    "id" serial NOT NULL,
    "user_id" integer NOT NULL,
    "post_id" integer NOT NULL,
    CONSTRAINT "likes_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);
ALTER TABLE "posts"
ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "hashtags_posts"
ADD CONSTRAINT "hashtags_posts_fk0" FOREIGN KEY ("post_id") REFERENCES "posts"("id");
ALTER TABLE "hashtags_posts"
ADD CONSTRAINT "hashtags_posts_fk1" FOREIGN KEY ("hashtag_id") REFERENCES "hashtags"("id");
ALTER TABLE "likes"
ADD CONSTRAINT "likes_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "likes"
ADD CONSTRAINT "likes_fk1" FOREIGN KEY ("post_id") REFERENCES "posts"("id");
ALTER TABLE posts
    RENAME COLUMN url TO link;
ALTER TABLE posts
    RENAME COLUMN description TO text;
ALTER TABLE users
    RENAME COLUMN picture_url TO avatar;
CREATE TABLE metadatas (
    id serial PRIMARY KEY,
    title text NOT NULL,
    image text NOT NULL,
    description text NOT NULL,
    post_id integer REFERENCES posts(id) NOT NULL
);
CREATE TABLE "reposts" (
    "id" serial NOT NULL,
    "post_id" integer NOT NULL,
    "user_id" integer NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT "reposts_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);
ALTER TABLE "reposts"
ADD CONSTRAINT "reposts_fk0" FOREIGN KEY ("post_id") REFERENCES "posts"("id");
ALTER TABLE "reposts"
ADD CONSTRAINT "reposts_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");
CREATE TABLE "comments" (
    "id" serial NOT NULL,
    "post_id" integer NOT NULL,
    "writer_id" integer NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT "comments_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);
ALTER TABLE "comments"
ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("post_id") REFERENCES "posts"("id");
ALTER TABLE "comments"
ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("writer_id") REFERENCES "users"("id");
CREATE TABLE "follows" (
    "id" serial NOT NULL,
    "follower_id" integer NOT NULL,
    "followed_id" integer NOT NULL,
    CONSTRAINT "follows_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
ALTER TABLE "follows" ADD CONSTRAINT "follows_fk0" FOREIGN KEY ("follower_id") REFERENCES "users"("id");
ALTER TABLE "follows" ADD CONSTRAINT "follows_fk1" FOREIGN KEY ("followed_id") REFERENCES "users"("id");