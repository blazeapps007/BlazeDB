# database.py
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from pymongo import ASCENDING, DESCENDING
import config

# This class acts as a global holder for the client connection.
class DBMotor:
    client: AsyncIOMotorClient = None

db_motor = DBMotor()

def get_database() -> AsyncIOMotorDatabase:
    """
    Returns the database instance from the connected client.
    This will be used as a dependency in API endpoints.
    """
    return db_motor.client[config.MONGO_DB_NAME]

async def connect_to_mongo():
    """Establishes a connection to the MongoDB server."""
    print("Connecting to MongoDB...")
    db_motor.client = AsyncIOMotorClient(config.MONGO_URI)
    print("Successfully connected to MongoDB.")

async def close_mongo_connection():
    """Closes the active MongoDB connection."""
    if db_motor.client:
        print("Closing MongoDB connection...")
        db_motor.client.close()
        print("MongoDB connection closed.")

async def create_indexes():
    """
    Ensures that all required indexes exist in the 'blocks' collection.
    This function is idempotent; it won't create an index if it already exists,
    so it's safe to run on every application startup.
    """
    print("Checking and creating database indexes if necessary...")
    db = get_database()
    blocks_collection = db[config.MONGO_COLLECTION_BLOCKS]

    # Define all your required indexes here
    indexes_to_create = [
        ("block_num", DESCENDING),
        ("block_id", ASCENDING),
        ("transactions.transaction_id", ASCENDING),
        ("timestamp", ASCENDING),
        ("virtual_ops.1.from", ASCENDING),
        ("virtual_ops.1.to", ASCENDING),
        ("virtual_ops.1.owner", ASCENDING),
        ("virtual_ops.1.witness", ASCENDING),
        ("virtual_ops.1.account", ASCENDING),
        ("transactions.operations.1.author", ASCENDING),
        ("transactions.operations.1.voter", ASCENDING),
        ("transactions.operations.1.delegator", ASCENDING),
        ("transactions.operations.1.delegatee", ASCENDING),
    ]

    existing_indexes = await blocks_collection.index_information()
    # Extract just the field names from the existing index info
    existing_index_fields = [v['key'][0][0] for k, v in existing_indexes.items()]

    for field, direction in indexes_to_create:
        if field not in existing_index_fields:
            print(f"Creating index on: {field}")
            await blocks_collection.create_index([(field, direction)])
        else:
            print(f"Index on '{field}' already exists.")
    
    # Handle unique index separately for clarity, if desired
    if "block_id_1" not in existing_indexes:
         await blocks_collection.create_index([("block_id", ASCENDING)], unique=True)

    print("Index check complete.")
