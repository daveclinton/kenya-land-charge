CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"phone_number" text NOT NULL,
	"date_of_birth" date NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"email_confirmed" boolean DEFAULT false NOT NULL,
	"confirmation_token" varchar(64),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phone_number_unique" UNIQUE("phone_number")
);
