CREATE TABLE IF NOT EXISTS "documents" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"loan_id" bigint,
	"identification_document_link" text,
	"power_of_attorney_link" text,
	"title_deed_link" text,
	"uploaded_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "loans" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"user_id" bigint,
	"amount" numeric NOT NULL,
	"repayment_period" integer NOT NULL,
	"status" text NOT NULL,
	"submitted_at" timestamp with time zone DEFAULT now(),
	"approved_at" timestamp with time zone,
	"disbursed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "personal_info" (
	"id" bigint PRIMARY KEY NOT NULL,
	"user_id" bigint,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"date_of_birth" date NOT NULL,
	"phone_number" text NOT NULL,
	"address" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "property_details" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"loan_id" bigint,
	"title_deed_number" text NOT NULL,
	"property_address" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "repayments" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"loan_id" bigint,
	"amount" numeric NOT NULL,
	"payment_date" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"email_confirmed" boolean DEFAULT false NOT NULL,
	"confirmation_token" varchar(64),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "documents" ADD CONSTRAINT "documents_loan_id_loans_id_fk" FOREIGN KEY ("loan_id") REFERENCES "public"."loans"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "loans" ADD CONSTRAINT "loans_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "personal_info" ADD CONSTRAINT "personal_info_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "property_details" ADD CONSTRAINT "property_details_loan_id_loans_id_fk" FOREIGN KEY ("loan_id") REFERENCES "public"."loans"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repayments" ADD CONSTRAINT "repayments_loan_id_loans_id_fk" FOREIGN KEY ("loan_id") REFERENCES "public"."loans"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
