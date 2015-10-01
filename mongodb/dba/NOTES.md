/* MongoDb For Database Administrators*/
WEEK 1::
Goals of Week 1: 
	History/Purpose of Mongodb
	Basic Concepts
		Scaling
		Document Model
	Administrative Shell

// CONCEPTS:
	Why Mongodb Was Created-
		A. Hardware Evolution - Parallelism
								Multiple Servers
								Cloud Servers
		B. The Ability to scale up easily and 		cheaply
		C. Make app development easier and 			elegant (structued, unstructured, & 	polymorphic)
	QUIZ:
		What were the big differences in hardware over the last few decades that MongoDB attempted to address?
	OPTIONS:	
		1. Parallelism of cores   //ANSWER
		2. Parallelism of servers //ANSWER
		3. Quantum computers
		4. Faster clock speeds
		5. More memory

// SCALING:
	As you scale up you lose features
	QUIZ:
		Q: When scaling out horizontally (adding more servers to contain your data), what are problems that arise as you go from, say, 1 commodity server to a few dozen?
	OPTIONS:
		1. The original server, if incorporated into the cluster, is more likely to fail in a given unit of time than if it had been left as a single server.
		2. The servers must communicate with one another eating up network bandwidth //ANSWER
		3. The need for redundancy increases as the likelihood of some failure in the system per unit of time increases. //  ANSWER
		4. Hardware cost per server is likely to increase.
// SQL & TRANSACTIONS:
	QUIZ:
		What causes significant problems for SQL when you attempt to scale horizontally (to multiple servers)?
	OPTIONS:
		1. Joins
		2. Queries
		3. Transactions
		4. Inserts
		5. Indexes


Week 2
// Inserting
	QUIZ:
		Insert the document
		{ x : 3 , y : 4 }
		into the temperature collection for the current database.
	ANSWER:
		db.temperature.insert({x:3, y:4});

// .save()
	QUIZ:
		What happens if you try to use db.collection.save(document) if the inserted document has no _id?
	OPTIONS:
		1. It will assign the document a new _id of the type already 	   used in the table and insert it.
		2. It will assign the document an existing _id field at random 	   and overwrite that existing document.
		3. It will insert the document with no _id.
		4. It will infer on its own what you meant and do that.
		5. It will assign the document an objectID for its _id field, 	   and then insert it.
		5. It will throw an exception, as it cannot update a document 	   that does not exist in the collection.

// Delete/Remove
	db.collection.remove();