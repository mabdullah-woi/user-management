#!/bin/bash

# Load environment variables explicitly
if [ -f .env ]; then
  echo "🔍 Loading environment variables from .env..."
  export $(grep -v '^#' .env | xargs)
else
  echo "⚠️  Warning: .env file not found! Using default values."
fi

# Check if required environment variables are set
: "${DATABASE_HOST:?Missing DATABASE_HOST in .env}"
: "${DATABASE_PORT:?Missing DATABASE_PORT in .env}"
: "${DATABASE_NAME:?Missing DATABASE_NAME in .env}"
: "${DATABASE_USER:?Missing DATABASE_USER in .env}"
: "${DATABASE_PASSWORD:?Missing DATABASE_PASSWORD in .env}"

echo "🌱 Seeding PostgreSQL database at $DATABASE_HOST:$DATABASE_PORT..."

# Function to execute SQL file
execute_sql() {
  local sql_file=$1
  if [ -f "$sql_file" ]; then
    echo "📂 Executing: $sql_file"
    PGPASSWORD="$DATABASE_PASSWORD" psql -h "$DATABASE_HOST" -p "$DATABASE_PORT" -U "$DATABASE_USER" -d "$DATABASE_NAME" -f "$sql_file"
  else
    echo "❌ ERROR: File $sql_file not found!"
    exit 1
  fi
}

# Execute all SQL scripts in order
execute_sql "src/database/seeds/insert_agencies.sql"
execute_sql "src/database/seeds/insert_roles.sql"
execute_sql "src/database/seeds/insert_permissions.sql"
execute_sql "src/database/seeds/assign_permissions.sql"
execute_sql "src/database/seeds/insert_users.sql"
execute_sql "src/database/seeds/assign_roles.sql"

echo "✅ Database seeding completed successfully!"
