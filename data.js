// Kafka Book Content Data
const kafkaContent = {
    sections: [
        {
            id: 'introduction',
            title: 'Introduction',
            subtitle: 'What is Kafka?',
            content: {
                description: 'Apache Kafka is a distributed streaming platform that is used to build real-time data pipelines and streaming applications. It was originally developed by LinkedIn in 2011 to handle their massive data ingestion and processing needs, and is now maintained by the Apache Software Foundation. Kafka has become the de facto standard for event streaming and is used by thousands of companies worldwide.',
                cards: [
                    {
                        title: 'What is Kafka?',
                        content: 'Kafka is a distributed event streaming platform capable of handling trillions of events a day. Think of it as a high-performance messaging system that can process and store streams of data in real-time. Unlike traditional message queues, Kafka is designed to handle data streams from multiple sources and deliver them to multiple consumers simultaneously, making it perfect for building event-driven architectures and real-time data processing systems.'
                    },
                    {
                        title: 'Why Kafka Matters',
                        content: 'In today\'s data-driven world, applications generate massive amounts of data that need to be processed in real-time. Traditional databases and message queues struggle with this scale. Kafka solves this by providing a unified platform for streaming data that can handle millions of messages per second with minimal latency. It\'s used by companies like Netflix, Uber, LinkedIn, and Twitter to power their real-time data infrastructure.'
                    },
                    {
                        title: 'Key Characteristics',
                        content: 'Kafka is known for its exceptional performance characteristics: <strong>High Throughput</strong> - can handle millions of messages per second; <strong>Low Latency</strong> - sub-millisecond latency for message delivery; <strong>Fault Tolerance</strong> - built-in replication and durability; <strong>Scalability</strong> - can scale horizontally across thousands of servers; <strong>Durability</strong> - messages are persisted to disk and replicated; <strong>Real-time Processing</strong> - designed for streaming data processing.'
                    },
                    {
                        title: 'Common Use Cases',
                        content: 'Kafka is used in a wide variety of scenarios: <strong>Event Sourcing</strong> - storing all changes to application state as events; <strong>Log Aggregation</strong> - collecting logs from multiple services; <strong>Stream Processing</strong> - real-time data transformation and analysis; <strong>Data Integration</strong> - connecting different systems and databases; <strong>Microservices Communication</strong> - asynchronous communication between services; <strong>Real-time Analytics</strong> - processing data streams for insights and monitoring.'
                    }
                ]
            }
        },
        {
            id: 'kafka-vs-rabbitmq',
            title: 'Kafka vs RabbitMQ',
            subtitle: 'Understanding the differences',
            content: {
                description: 'While both Kafka and RabbitMQ are message brokers, they serve different purposes and have distinct architectures. Understanding these differences is crucial for choosing the right tool for your specific use case. Kafka is designed for high-throughput event streaming, while RabbitMQ excels at traditional message queuing with complex routing.',
                comparison: {
                    headers: ['Feature', 'Kafka', 'RabbitMQ'],
                    rows: [
                        ['Primary Use Case', 'Event streaming and log aggregation', 'Message queuing and routing'],
                        ['Message Persistence', 'Persistent by default', 'Configurable persistence'],
                        ['Message Ordering', 'Guaranteed within partitions', 'Guaranteed within queues'],
                        ['Throughput', 'Very high (millions/sec)', 'High (hundreds of thousands/sec)'],
                        ['Latency', 'Low (sub-millisecond)', 'Very low (microseconds)'],
                        ['Complexity', 'Moderate to high', 'Low to moderate'],
                        ['Scalability', 'Horizontal scaling', 'Vertical and limited horizontal'],
                        ['Message Retention', 'Configurable (hours to days)', 'Until consumed'],
                        ['Consumer Model', 'Pull-based', 'Push-based'],
                        ['Routing', 'Partition-based', 'Exchange-based routing']
                    ]
                },
                cards: [
                    {
                        title: 'When to use Kafka',
                        content: 'Choose Kafka when you need: <strong>High-volume data streaming</strong> - processing millions of events per second; <strong>Event sourcing</strong> - storing all application state changes as events; <strong>Log aggregation</strong> - collecting logs from multiple services; <strong>Real-time analytics</strong> - processing data streams for insights; <strong>Data pipelines</strong> - building ETL processes; <strong>Microservices communication</strong> - event-driven architectures; <strong>Replay capabilities</strong> - reprocessing historical data.'
                    },
                    {
                        title: 'When to use RabbitMQ',
                        content: 'Choose RabbitMQ when you need: <strong>Complex routing</strong> - sophisticated message routing patterns; <strong>Request-response patterns</strong> - synchronous communication; <strong>Lower volume messaging</strong> - thousands to hundreds of thousands of messages per second; <strong>Message acknowledgments</strong> - guaranteed message delivery; <strong>Dead letter queues</strong> - handling failed messages; <strong>Priority queues</strong> - message prioritization; <strong>Complex workflows</strong> - multi-step message processing.'
                    },
                    {
                        title: 'Architecture Differences',
                        content: 'Kafka uses a <strong>distributed log architecture</strong> where messages are stored in topics divided into partitions. Each partition is replicated across multiple brokers for fault tolerance. RabbitMQ uses a <strong>broker-based architecture</strong> with exchanges, queues, and bindings. Messages are routed through exchanges to queues based on routing rules. Kafka is designed for horizontal scaling, while RabbitMQ scales better vertically.'
                    },
                    {
                        title: 'Performance Characteristics',
                        content: 'Kafka excels at <strong>throughput</strong> - it can handle millions of messages per second with relatively low latency. It\'s optimized for batch processing and can handle large message sizes efficiently. RabbitMQ excels at <strong>low latency</strong> - it can deliver messages in microseconds, making it ideal for real-time applications that need immediate responses. However, it has lower throughput compared to Kafka.'
                    }
                ]
            }
        },
        {
            id: 'core-concepts',
            title: 'Core Concepts',
            subtitle: 'Topics, Partitions, Producers, Consumers, Brokers',
            content: {
                description: 'Understanding Kafka\'s fundamental building blocks is crucial for effective usage. These core concepts form the foundation of how Kafka works and understanding them will help you design better streaming applications. Each concept plays a specific role in the overall architecture and has important implications for performance, scalability, and fault tolerance.',
                concepts: [
                    {
                        title: 'Topics',
                        description: 'A topic is a category or feed name to which records are published. Think of it as a database table or a folder in a file system. Topics in Kafka are always multi-subscriber, meaning multiple consumers can read from the same topic independently. Topics are the primary abstraction for organizing data streams in Kafka. They provide a way to categorize and organize related messages, making it easy for producers to send data and consumers to find the data they need.',
                        code: `// Creating a topic
kafka-topics.sh --create --topic user-events \\
  --bootstrap-server localhost:9092 \\
  --partitions 3 \\
  --replication-factor 1`
                    },
                    {
                        title: 'Partitions',
                        description: 'Topics are split into partitions for scalability and parallel processing. Each partition is an ordered, immutable sequence of records that acts like a log. Partitions are the key to Kafka\'s scalability - they allow topics to be distributed across multiple brokers and enable parallel processing by consumers. The number of partitions determines the maximum parallelism for consumers, and messages within a partition are guaranteed to be in order. This design allows Kafka to handle massive throughput by distributing the load across multiple partitions.',
                        code: `// Topic with 3 partitions
Topic: user-events
├── Partition 0: [msg1, msg4, msg7, ...]
├── Partition 1: [msg2, msg5, msg8, ...]
└── Partition 2: [msg3, msg6, msg9, ...]`
                    },
                    {
                        title: 'Producers',
                        description: 'Producers are applications that publish data to Kafka topics. They are responsible for creating and sending messages to the appropriate topics. Producers can choose which partition to send data to, either explicitly or by using a partitioner that automatically distributes messages across partitions. They handle retries, batching, and compression to optimize performance. Producers can be configured for different delivery guarantees: at-most-once, at-least-once, or exactly-once delivery.',
                        code: `// Simple Producer in JavaScript
const kafka = require('kafkajs');

const producer = kafka.producer();

await producer.connect();
await producer.send({
  topic: 'user-events',
  messages: [{
    key: 'user-123',
    value: JSON.stringify({
      userId: '123',
      action: 'login',
      timestamp: Date.now()
    })
  }]
});`
                    },
                    {
                        title: 'Consumers',
                        description: 'Consumers are applications that read data from Kafka topics. They subscribe to one or more topics and process the stream of records produced to them. Consumers can be organized into consumer groups for parallel processing and load balancing. Each consumer group can have multiple consumers, and Kafka automatically distributes partitions among the consumers in the group. Consumers maintain their position (offset) in each partition, allowing them to resume processing from where they left off.',
                        code: `// Simple Consumer in JavaScript
const consumer = kafka.consumer({ groupId: 'user-events-group' });

await consumer.connect();
await consumer.subscribe({ topic: 'user-events' });

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      key: message.key.toString(),
      value: message.value.toString(),
      partition,
      offset: message.offset
    });
  }
});`
                    },
                    {
                        title: 'Brokers',
                        description: 'Brokers are Kafka servers that store data and serve clients. A Kafka cluster consists of multiple brokers working together to provide high availability and fault tolerance. Each broker is identified by a unique ID and can host multiple partitions. Brokers handle requests from producers and consumers, manage partition leadership, and coordinate with other brokers for replication. They store data on disk and can handle thousands of partitions and millions of messages per second.',
                        code: `// Broker configuration
server.properties:
broker.id=1
listeners=PLAINTEXT://localhost:9092
log.dirs=/tmp/kafka-logs
num.network.threads=3
num.io.threads=8`
                    }
                ]
            }
        },
        {
            id: 'kafka-ecosystem',
            title: 'Kafka Ecosystem',
            subtitle: 'Connect, Streams, Schema Registry',
            content: {
                description: 'Kafka\'s ecosystem provides powerful tools for building complete streaming data platforms. These tools extend Kafka\'s core functionality to handle data integration, stream processing, and schema management. Together, they form a comprehensive platform for building real-time data applications and pipelines.',
                tools: [
                    {
                        title: 'Kafka Connect',
                        description: 'Kafka Connect is a framework for connecting Kafka with external systems such as databases, key-value stores, search indexes, and file systems. It provides a scalable and reliable way to stream data between Kafka and other systems without writing custom code. Connect handles common concerns like fault tolerance, parallelization, and offset management. It comes with many pre-built connectors for popular systems like MySQL, PostgreSQL, Elasticsearch, and S3.',
                        code: `// Example: File Source Connector
{
  "name": "file-source",
  "config": {
    "connector.class": "FileStreamSource",
    "tasks.max": "1",
    "file": "/tmp/test.txt",
    "topic": "connect-test"
  }
}`
                    },
                    {
                        title: 'Kafka Streams',
                        description: 'Kafka Streams is a client library for building applications and microservices that process and analyze data stored in Kafka. It provides a simple and powerful API for building real-time stream processing applications using standard Java and Scala collections. Streams handles complex operations like windowing, joins, aggregations, and state management. It\'s designed to be embedded in your applications and can scale from small microservices to large distributed applications.',
                        code: `// Simple Kafka Streams application
const { KafkaStreams } = require('kafka-streams');

const kafkaStreams = new KafkaStreams({
  kafkaHost: 'localhost:9092',
  groupId: 'streams-group',
  clientName: 'streams-client'
});

const stream = kafkaStreams.getKStream('input-topic');
stream
  .mapJSONConvenience()
  .filter((message) => message.value > 100)
  .to('output-topic');`
                    },
                    {
                        title: 'Schema Registry',
                        description: 'Schema Registry is a service that stores and manages schemas for your Kafka messages, ensuring data compatibility and evolution. It provides a centralized repository for schemas and handles schema versioning, validation, and evolution. This is crucial for maintaining data quality and enabling schema evolution as your applications grow. Schema Registry supports Avro, JSON Schema, and Protobuf formats, and integrates seamlessly with Kafka producers and consumers.',
                        code: `// Registering a schema
curl -X POST -H "Content-Type: application/vnd.schemaregistry.v1+json" \\
  --data '{"schema": "{\\"type\\":\\"record\\",\\"name\\":\\"User\\",\\"fields\\":[{\\"name\\":\\"id\\",\\"type\\":\\"int\\"},{\\"name\\":\\"name\\",\\"type\\":\\"string\\"}]}"}' \\
  http://localhost:8081/subjects/users/versions`
                    }
                ]
            }
        },
        {
            id: 'basic-operations',
            title: 'Basic Operations',
            subtitle: 'Working with Kafka',
            content: {
                description: 'Essential operations for managing and working with Kafka clusters.',
                operations: [
                    {
                        title: 'Topic Management',
                        code: `# List topics
kafka-topics.sh --list --bootstrap-server localhost:9092

# Create topic
kafka-topics.sh --create --topic my-topic \\
  --bootstrap-server localhost:9092 \\
  --partitions 3 \\
  --replication-factor 1

# Describe topic
kafka-topics.sh --describe --topic my-topic \\
  --bootstrap-server localhost:9092

# Delete topic
kafka-topics.sh --delete --topic my-topic \\
  --bootstrap-server localhost:9092`
                    },
                    {
                        title: 'Producer Operations',
                        code: `# Console producer
kafka-console-producer.sh --topic my-topic \\
  --bootstrap-server localhost:9092

# Producer with key
kafka-console-producer.sh --topic my-topic \\
  --bootstrap-server localhost:9092 \\
  --property "parse.key=true" \\
  --property "key.separator=:"`
                    },
                    {
                        title: 'Consumer Operations',
                        code: `# Console consumer
kafka-console-consumer.sh --topic my-topic \\
  --bootstrap-server localhost:9092 \\
  --from-beginning

# Consumer group
kafka-console-consumer.sh --topic my-topic \\
  --bootstrap-server localhost:9092 \\
  --group my-group \\
  --from-beginning

# List consumer groups
kafka-consumer-groups.sh --list \\
  --bootstrap-server localhost:9092`
                    }
                ]
            }
        },
        {
            id: 'cluster-operations',
            title: 'Cluster Operations',
            subtitle: 'Managing Kafka Clusters',
            content: {
                description: 'Understanding how Kafka clusters work and how to manage them effectively.',
                concepts: [
                    {
                        title: 'Cluster Architecture',
                        description: 'A Kafka cluster consists of multiple brokers working together to provide high availability and fault tolerance.',
                        diagram: 'cluster-architecture'
                    },
                    {
                        title: 'Replication',
                        description: 'Kafka replicates data across multiple brokers to ensure fault tolerance. Each partition has a leader and followers.',
                        code: `# Topic with replication factor 3
Topic: important-data
├── Partition 0: Leader(Broker1), Follower(Broker2), Follower(Broker3)
├── Partition 1: Leader(Broker2), Follower(Broker1), Follower(Broker3)
└── Partition 2: Leader(Broker3), Follower(Broker1), Follower(Broker2)`
                    },
                    {
                        title: 'Leader Election',
                        description: 'When a broker fails, Kafka automatically elects a new leader for each partition that was led by the failed broker.',
                        code: `# Monitoring cluster health
kafka-broker-api-versions.sh --bootstrap-server localhost:9092

# Checking broker status
kafka-log-dirs.sh --bootstrap-server localhost:9092 \\
  --describe --json`
                    }
                ]
            }
        },
        {
            id: 'kafka-workflow',
            title: 'Kafka Workflow',
            subtitle: 'How data flows through Kafka',
            content: {
                description: 'Understanding the complete data flow from producers to consumers in a Kafka system.',
                workflow: [
                    {
                        step: 1,
                        title: 'Producer sends message',
                        description: 'Producer publishes a message to a specific topic and partition'
                    },
                    {
                        step: 2,
                        title: 'Broker receives message',
                        description: 'The leader broker for that partition receives and stores the message'
                    },
                    {
                        step: 3,
                        title: 'Replication',
                        description: 'Message is replicated to follower brokers for fault tolerance'
                    },
                    {
                        step: 4,
                        title: 'Consumer reads message',
                        description: 'Consumer pulls messages from the topic at its own pace'
                    },
                    {
                        step: 5,
                        title: 'Offset management',
                        description: 'Consumer commits its offset to track progress'
                    }
                ]
            }
        },
        {
            id: 'producer-consumer',
            title: 'Producer & Consumer',
            subtitle: 'Simple examples',
            content: {
                description: 'Practical examples of creating producers and consumers in JavaScript.',
                examples: [
                    {
                        title: 'Advanced Producer',
                        code: `const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
});

const producer = kafka.producer({
  maxInFlightRequests: 1,
  idempotent: true,
  transactionTimeout: 30000
});

async function sendMessage() {
  await producer.connect();
  
  try {
    await producer.send({
      topic: 'user-events',
      messages: [{
        key: 'user-123',
        value: JSON.stringify({
          userId: '123',
          action: 'purchase',
          amount: 99.99,
          timestamp: new Date().toISOString()
        }),
        headers: {
          'content-type': 'application/json'
        }
      }]
    });
    console.log('Message sent successfully');
  } catch (error) {
    console.error('Error sending message:', error);
  } finally {
    await producer.disconnect();
  }
}

sendMessage();`
                    },
                    {
                        title: 'Advanced Consumer',
                        code: `const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ 
  groupId: 'user-events-group',
  sessionTimeout: 30000,
  heartbeatInterval: 3000
});

async function consumeMessages() {
  await consumer.connect();
  await consumer.subscribe({ 
    topic: 'user-events',
    fromBeginning: false 
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const data = JSON.parse(message.value.toString());
        console.log('Processing message:', {
          topic,
          partition,
          offset: message.offset,
          key: message.key?.toString(),
          data
        });
        
        // Process the message
        await processUserEvent(data);
        
      } catch (error) {
        console.error('Error processing message:', error);
      }
    }
  });
}

async function processUserEvent(data) {
  // Your business logic here
  console.log('Processing user event:', data);
}

consumeMessages();`
                    }
                ]
            }
        },
        {
            id: 'consumer-groups',
            title: 'Consumer Groups',
            subtitle: 'How they work',
            content: {
                description: 'Consumer groups allow multiple consumers to work together to process messages from a topic in parallel.',
                concepts: [
                    {
                        title: 'Group Coordination',
                        description: 'Kafka uses a group coordinator to manage consumer group membership and partition assignment.',
                        code: `# Consumer Group with 3 consumers
Topic: orders (3 partitions)
├── Consumer 1 → Partition 0
├── Consumer 2 → Partition 1
└── Consumer 3 → Partition 2

# If Consumer 2 fails:
├── Consumer 1 → Partition 0
└── Consumer 3 → Partition 1, Partition 2`
                    },
                    {
                        title: 'Rebalancing',
                        description: 'When consumers join or leave a group, Kafka rebalances partitions among the remaining consumers.',
                        code: `// Handling rebalancing
const consumer = kafka.consumer({ 
  groupId: 'orders-group',
  rebalanceTimeout: 60000
});

consumer.on('consumer.group_rebalancing', () => {
  console.log('Rebalancing started...');
});

consumer.on('consumer.group_joined', () => {
  console.log('Joined consumer group');
});`
                    },
                    {
                        title: 'Offset Management',
                        description: 'Consumers track their progress using offsets. Kafka provides automatic and manual offset management.',
                        code: `// Manual offset management
await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    // Process message
    await processMessage(message);
    
    // Commit offset manually
    await consumer.commitOffsets([{
      topic,
      partition,
      offset: (parseInt(message.offset) + 1).toString()
    }]);
  }
});`
                    }
                ]
            }
        },
        {
            id: 'kraft-mode',
            title: 'KRaft Mode',
            subtitle: 'Kafka without ZooKeeper',
            content: {
                description: 'KRaft (Kafka Raft) is a new consensus protocol that eliminates the need for ZooKeeper in Kafka clusters. This is a major architectural improvement that simplifies Kafka operations, reduces resource usage, and improves scalability. KRaft mode was introduced to address the operational complexity and scalability limitations of ZooKeeper-based Kafka clusters.',
                concepts: [
                    {
                        title: 'What is KRaft?',
                        description: 'KRaft is a Raft-based consensus protocol that provides the same functionality as ZooKeeper but is built directly into Kafka. It uses the Raft algorithm for leader election and log replication, eliminating the need for a separate ZooKeeper cluster. KRaft controllers manage cluster metadata, handle partition assignments, and coordinate cluster operations. This integration reduces operational complexity and improves performance by eliminating network hops between Kafka and ZooKeeper.',
                        code: `# KRaft mode configuration
process.roles=broker,controller
node.id=1
controller.quorum.voters=1@localhost:9093,2@localhost:9094,3@localhost:9095
listeners=PLAINTEXT://localhost:9092,CONTROLLER://localhost:9093`
                    },
                    {
                        title: 'Why replace ZooKeeper?',
                        description: 'KRaft eliminates operational complexity, reduces resource usage, and improves scalability by removing the external ZooKeeper dependency. ZooKeeper was becoming a bottleneck for large Kafka clusters, limiting the number of partitions and topics that could be managed. KRaft addresses these limitations by integrating metadata management directly into Kafka, reducing the number of systems to operate and monitor.',
                        benefits: [
                            'Simplified operations - no separate ZooKeeper cluster to manage',
                            'Better performance - fewer network hops',
                            'Improved scalability - can handle millions of partitions',
                            'Reduced resource usage - no duplicate metadata storage'
                        ]
                    },
                    {
                        title: 'How KRaft works',
                        description: 'KRaft uses a Raft consensus algorithm where controller nodes maintain cluster metadata and coordinate operations. The Raft algorithm ensures that all controller nodes agree on the cluster state through a leader-follower model. The leader handles all write operations and replicates changes to followers. If the leader fails, followers automatically elect a new leader. This provides strong consistency guarantees while maintaining high availability.',
                        code: `# KRaft cluster with 3 controller nodes
Controller 1 (Leader) ←→ Controller 2 (Follower)
       ↕                        ↕
Controller 3 (Follower) ←→ Broker Nodes`
                    }
                ]
            }
        },
        {
            id: 'installation-setup',
            title: 'Installation & Setup',
            subtitle: 'Getting started with Kafka',
            content: {
                description: 'Step-by-step guide to installing and setting up Kafka for development.',
                steps: [
                    {
                        title: 'Download Kafka',
                        code: `# Download Kafka
wget https://downloads.apache.org/kafka/2.13-3.5.0/kafka_2.13-3.5.0.tgz
tar -xzf kafka_2.13-3.5.0.tgz
cd kafka_2.13-3.5.0`
                    },
                    {
                        title: 'Start ZooKeeper (if not using KRaft)',
                        code: `# Start ZooKeeper
bin/zookeeper-server-start.sh config/zookeeper.properties`
                    },
                    {
                        title: 'Start Kafka Server',
                        code: `# Start Kafka
bin/kafka-server-start.sh config/server.properties`
                    },
                    {
                        title: 'Verify Installation',
                        code: `# List topics (should be empty initially)
bin/kafka-topics.sh --list --bootstrap-server localhost:9092

# Create a test topic
bin/kafka-topics.sh --create --topic test-topic \\
  --bootstrap-server localhost:9092 \\
  --partitions 1 \\
  --replication-factor 1`
                    }
                ]
            }
        },
        {
            id: 'project-demo',
            title: 'Project Demonstration',
            subtitle: 'Complete example with code',
            content: {
                description: 'A complete example showing a producer sending messages and a consumer processing them.',
                project: {
                    title: 'E-commerce Event Processing',
                    description: 'This example demonstrates how to process e-commerce events like orders, payments, and shipments.',
                    components: [
                        {
                            name: 'Order Producer',
                            code: `// order-producer.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'order-producer',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

async function createOrder() {
  await producer.connect();
  
  const order = {
    orderId: 'ORD-' + Date.now(),
    customerId: 'CUST-123',
    items: [
      { productId: 'PROD-1', quantity: 2, price: 29.99 },
      { productId: 'PROD-2', quantity: 1, price: 49.99 }
    ],
    total: 109.97,
    timestamp: new Date().toISOString()
  };

  await producer.send({
    topic: 'orders',
    messages: [{
      key: order.orderId,
      value: JSON.stringify(order)
    }]
  });

  console.log('Order created:', order.orderId);
  await producer.disconnect();
}

// Create orders every 5 seconds
setInterval(createOrder, 5000);`
                        },
                        {
                            name: 'Order Consumer',
                            code: `// order-consumer.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'order-consumer',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'order-processors' });

async function processOrders() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'orders' });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const order = JSON.parse(message.value.toString());
      
      console.log('Processing order:', order.orderId);
      
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Send to payment topic
      await sendToPaymentTopic(order);
      
      console.log('Order processed successfully:', order.orderId);
    }
  });
}

async function sendToPaymentTopic(order) {
  const producer = kafka.producer();
  await producer.connect();
  
  await producer.send({
    topic: 'payments',
    messages: [{
      key: order.orderId,
      value: JSON.stringify({
        orderId: order.orderId,
        amount: order.total,
        status: 'pending',
        timestamp: new Date().toISOString()
      })
    }]
  });
  
  await producer.disconnect();
}

processOrders();`
                        }
                    ]
                }
            }
        },
        {
            id: 'use-cases',
            title: 'Use Cases',
            subtitle: 'Real-world scenarios',
            content: {
                description: 'Common real-world use cases where Kafka excels.',
                useCases: [
                    {
                        title: 'Event Sourcing',
                        description: 'Store all changes to application state as a sequence of events.',
                        example: 'Banking systems tracking all transactions, e-commerce order history'
                    },
                    {
                        title: 'Log Aggregation',
                        description: 'Collect logs from multiple services and make them available for analysis.',
                        example: 'Centralized logging for microservices, application monitoring'
                    },
                    {
                        title: 'Stream Processing',
                        description: 'Process data streams in real-time for analytics and decision making.',
                        example: 'Real-time fraud detection, recommendation engines'
                    },
                    {
                        title: 'Data Integration',
                        description: 'Connect different systems and databases for data synchronization.',
                        example: 'ETL pipelines, data lake ingestion, database replication'
                    },
                    {
                        title: 'Microservices Communication',
                        description: 'Enable asynchronous communication between microservices.',
                        example: 'Order processing workflows, notification systems'
                    }
                ]
            }
        },
        {
            id: 'summary',
            title: 'Summary & Key Takeaways',
            subtitle: 'What you\'ve learned',
            content: {
                description: 'Key concepts and best practices for working with Kafka.',
                takeaways: [
                    {
                        title: 'Core Concepts',
                        items: [
                            'Topics organize messages into categories',
                            'Partitions enable parallel processing and scalability',
                            'Producers publish messages to topics',
                            'Consumers read messages from topics',
                            'Brokers store and serve the data'
                        ]
                    },
                    {
                        title: 'Best Practices',
                        items: [
                            'Choose appropriate partition keys for even distribution',
                            'Use consumer groups for parallel processing',
                            'Configure appropriate replication factors for fault tolerance',
                            'Monitor consumer lag and cluster health',
                            'Use idempotent producers for exactly-once semantics'
                        ]
                    },
                    {
                        title: 'When to Use Kafka',
                        items: [
                            'High-throughput event streaming',
                            'Real-time data processing',
                            'Log aggregation and monitoring',
                            'Event-driven architectures',
                            'Data integration between systems'
                        ]
                    }
                ]
            }
        }
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = kafkaContent;
}
