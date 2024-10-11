CREATE TABLE IF NOT EXISTS "form_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"title_number" varchar(255) NOT NULL,
	"property_description" varchar(1000) NOT NULL,
	"principal_amount" integer NOT NULL,
	"principal_amount_words" varchar(255) NOT NULL,
	"interest_rate" integer NOT NULL,
	"repayment_date" date NOT NULL,
	"title_deed_url" varchar(255),
	"charge_document_url" varchar(255),
	"personal_insurance_url" varchar(255),
	"power_of_attorney_url" varchar(255),
	"identification_document_url" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
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
