from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
import sys, os

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.utils.db import Base
from app.models import Farmer, LandRecord, Claim, Grievance  # noqa

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata

def get_url():
    return os.getenv(
        "DATABASE_URL",
        "postgresql+psycopg2://postgres:mysecretpassword123@localhost:5432/agri_db"
    ).replace("asyncpg", "psycopg2")

def include_object(object, name, type_, reflected, compare_to):
    # ignore ALL reflected tables (PostGIS internals, tiger, topology etc)
    if type_ == "table" and reflected:
        return False
    return True

def run_migrations_offline():
    context.configure(
        url=get_url(),
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        include_object=include_object,
        include_schemas=False,
    )
    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online():
    configuration = config.get_section(config.config_ini_section)
    configuration["sqlalchemy.url"] = get_url()
    connectable = engine_from_config(
        configuration, prefix="sqlalchemy.", poolclass=pool.NullPool
    )
    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            include_object=include_object,
            include_schemas=False,
        )
        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()