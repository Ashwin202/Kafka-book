// SVG Diagrams for Kafka Book
const diagrams = {
    'cluster-architecture': `
        <svg width="100%" height="400" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <style>
                    .broker { fill: #3b82f6; stroke: #1d4ed8; stroke-width: 2; }
                    .producer { fill: #10b981; stroke: #059669; stroke-width: 2; }
                    .consumer { fill: #f59e0b; stroke: #d97706; stroke-width: 2; }
                    .topic { fill: #8b5cf6; stroke: #7c3aed; stroke-width: 2; }
                    .text { font-family: Inter, sans-serif; font-size: 14px; fill: #374151; }
                    .title { font-family: Inter, sans-serif; font-size: 16px; font-weight: bold; fill: #111827; }
                    .arrow { stroke: #6b7280; stroke-width: 2; fill: none; marker-end: url(#arrowhead); }
                </style>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                </marker>
            </defs>
            
            <!-- Title -->
            <text x="400" y="30" text-anchor="middle" class="title">Kafka Cluster Architecture</text>
            
            <!-- Brokers -->
            <rect x="50" y="100" width="120" height="80" rx="10" class="broker"/>
            <text x="110" y="125" text-anchor="middle" class="text" fill="white">Broker 1</text>
            <text x="110" y="145" text-anchor="middle" class="text" fill="white">Leader</text>
            <text x="110" y="165" text-anchor="middle" class="text" fill="white">Partition 0</text>
            
            <rect x="200" y="100" width="120" height="80" rx="10" class="broker"/>
            <text x="260" y="125" text-anchor="middle" class="text" fill="white">Broker 2</text>
            <text x="260" y="145" text-anchor="middle" class="text" fill="white">Leader</text>
            <text x="260" y="165" text-anchor="middle" class="text" fill="white">Partition 1</text>
            
            <rect x="350" y="100" width="120" height="80" rx="10" class="broker"/>
            <text x="410" y="125" text-anchor="middle" class="text" fill="white">Broker 3</text>
            <text x="410" y="145" text-anchor="middle" class="text" fill="white">Leader</text>
            <text x="410" y="165" text-anchor="middle" class="text" fill="white">Partition 2</text>
            
            <!-- Topic -->
            <rect x="500" y="100" width="120" height="80" rx="10" class="topic"/>
            <text x="560" y="125" text-anchor="middle" class="text" fill="white">Topic</text>
            <text x="560" y="145" text-anchor="middle" class="text" fill="white">user-events</text>
            <text x="560" y="165" text-anchor="middle" class="text" fill="white">3 Partitions</text>
            
            <!-- Producer -->
            <rect x="50" y="250" width="100" height="60" rx="10" class="producer"/>
            <text x="100" y="275" text-anchor="middle" class="text" fill="white">Producer</text>
            <text x="100" y="295" text-anchor="middle" class="text" fill="white">App</text>
            
            <!-- Consumer Group -->
            <rect x="300" y="250" width="100" height="60" rx="10" class="consumer"/>
            <text x="350" y="275" text-anchor="middle" class="text" fill="white">Consumer</text>
            <text x="350" y="295" text-anchor="middle" class="text" fill="white">Group</text>
            
            <!-- Individual Consumers -->
            <rect x="450" y="250" width="80" height="50" rx="8" class="consumer"/>
            <text x="490" y="270" text-anchor="middle" class="text" fill="white">Consumer</text>
            <text x="490" y="285" text-anchor="middle" class="text" fill="white">1</text>
            
            <rect x="550" y="250" width="80" height="50" rx="8" class="consumer"/>
            <text x="590" y="270" text-anchor="middle" class="text" fill="white">Consumer</text>
            <text x="590" y="285" text-anchor="middle" class="text" fill="white">2</text>
            
            <rect x="650" y="250" width="80" height="50" rx="8" class="consumer"/>
            <text x="690" y="270" text-anchor="middle" class="text" fill="white">Consumer</text>
            <text x="690" y="285" text-anchor="middle" class="text" fill="white">3</text>
            
            <!-- Arrows -->
            <line x1="150" y1="280" x2="200" y2="140" class="arrow"/>
            <line x1="150" y1="280" x2="260" y2="140" class="arrow"/>
            <line x1="150" y1="280" x2="410" y2="140" class="arrow"/>
            
            <line x1="350" y1="140" x2="400" y2="140" class="arrow"/>
            <line x1="260" y1="140" x2="350" y2="140" class="arrow"/>
            <line x1="410" y1="140" x2="500" y2="140" class="arrow"/>
            
            <line x1="400" y1="180" x2="350" y2="250" class="arrow"/>
            <line x1="400" y1="180" x2="490" y2="250" class="arrow"/>
            <line x1="400" y1="180" x2="590" y2="250" class="arrow"/>
            <line x1="400" y1="180" x2="690" y2="250" class="arrow"/>
            
            <!-- Labels -->
            <text x="175" y="200" text-anchor="middle" class="text">Publish</text>
            <text x="400" y="220" text-anchor="middle" class="text">Subscribe</text>
        </svg>
    `,
    
    'kafka-workflow': `
        <svg width="100%" height="300" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <style>
                    .step { fill: #f3f4f6; stroke: #d1d5db; stroke-width: 2; }
                    .step-active { fill: #dbeafe; stroke: #3b82f6; stroke-width: 2; }
                    .text { font-family: Inter, sans-serif; font-size: 12px; fill: #374151; }
                    .title { font-family: Inter, sans-serif; font-size: 14px; font-weight: bold; fill: #111827; }
                    .arrow { stroke: #6b7280; stroke-width: 2; fill: none; marker-end: url(#arrowhead2); }
                </style>
                <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                </marker>
            </defs>
            
            <!-- Title -->
            <text x="400" y="25" text-anchor="middle" class="title">Kafka Message Flow</text>
            
            <!-- Steps -->
            <rect x="50" y="60" width="120" height="80" rx="10" class="step-active"/>
            <text x="110" y="85" text-anchor="middle" class="title">1. Producer</text>
            <text x="110" y="105" text-anchor="middle" class="text">Sends Message</text>
            <text x="110" y="120" text-anchor="middle" class="text">to Topic</text>
            
            <rect x="200" y="60" width="120" height="80" rx="10" class="step"/>
            <text x="260" y="85" text-anchor="middle" class="title">2. Broker</text>
            <text x="260" y="105" text-anchor="middle" class="text">Receives &</text>
            <text x="260" y="120" text-anchor="middle" class="text">Stores Message</text>
            
            <rect x="350" y="60" width="120" height="80" rx="10" class="step"/>
            <text x="410" y="85" text-anchor="middle" class="title">3. Replication</text>
            <text x="410" y="105" text-anchor="middle" class="text">Copies to</text>
            <text x="410" y="120" text-anchor="middle" class="text">Followers</text>
            
            <rect x="500" y="60" width="120" height="80" rx="10" class="step"/>
            <text x="560" y="85" text-anchor="middle" class="title">4. Consumer</text>
            <text x="560" y="105" text-anchor="middle" class="text">Pulls Message</text>
            <text x="560" y="120" text-anchor="middle" class="text">from Topic</text>
            
            <rect x="650" y="60" width="120" height="80" rx="10" class="step"/>
            <text x="710" y="85" text-anchor="middle" class="title">5. Processing</text>
            <text x="710" y="105" text-anchor="middle" class="text">Commits</text>
            <text x="710" y="120" text-anchor="middle" class="text">Offset</text>
            
            <!-- Arrows -->
            <line x1="170" y1="100" x2="200" y2="100" class="arrow"/>
            <line x1="320" y1="100" x2="350" y2="100" class="arrow"/>
            <line x1="470" y1="100" x2="500" y2="100" class="arrow"/>
            <line x1="620" y1="100" x2="650" y2="100" class="arrow"/>
            
            <!-- Timeline -->
            <line x1="50" y1="180" x2="770" y2="180" stroke="#e5e7eb" stroke-width="2"/>
            <text x="50" y="200" class="text">Time →</text>
            
            <!-- Key Points -->
            <text x="50" y="240" class="text">• Messages are immutable once written</text>
            <text x="50" y="260" class="text">• Consumers read at their own pace</text>
            <text x="50" y="280" class="text">• Offsets track consumer progress</text>
        </svg>
    `,
    
    'consumer-group': `
        <svg width="100%" height="350" viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <style>
                    .partition { fill: #f3f4f6; stroke: #d1d5db; stroke-width: 2; }
                    .consumer { fill: #fef3c7; stroke: #f59e0b; stroke-width: 2; }
                    .consumer-active { fill: #fbbf24; stroke: #d97706; stroke-width: 2; }
                    .text { font-family: Inter, sans-serif; font-size: 12px; fill: #374151; }
                    .title { font-family: Inter, sans-serif; font-size: 14px; font-weight: bold; fill: #111827; }
                    .arrow { stroke: #6b7280; stroke-width: 2; fill: none; marker-end: url(#arrowhead3); }
                </style>
                <marker id="arrowhead3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                </marker>
            </defs>
            
            <!-- Title -->
            <text x="400" y="25" text-anchor="middle" class="title">Consumer Group Partition Assignment</text>
            
            <!-- Topic Partitions -->
            <rect x="50" y="60" width="100" height="60" rx="8" class="partition"/>
            <text x="100" y="85" text-anchor="middle" class="title">Partition 0</text>
            <text x="100" y="105" text-anchor="middle" class="text">Messages 1-100</text>
            
            <rect x="170" y="60" width="100" height="60" rx="8" class="partition"/>
            <text x="220" y="85" text-anchor="middle" class="title">Partition 1</text>
            <text x="220" y="105" text-anchor="middle" class="text">Messages 101-200</text>
            
            <rect x="290" y="60" width="100" height="60" rx="8" class="partition"/>
            <text x="340" y="85" text-anchor="middle" class="title">Partition 2</text>
            <text x="340" y="105" text-anchor="middle" class="text">Messages 201-300</text>
            
            <rect x="410" y="60" width="100" height="60" rx="8" class="partition"/>
            <text x="460" y="85" text-anchor="middle" class="title">Partition 3</text>
            <text x="460" y="105" text-anchor="middle" class="text">Messages 301-400</text>
            
            <!-- Consumer Group -->
            <rect x="550" y="50" width="200" height="80" rx="10" fill="#e0f2fe" stroke="#0891b2" stroke-width="2"/>
            <text x="650" y="75" text-anchor="middle" class="title">Consumer Group</text>
            <text x="650" y="95" text-anchor="middle" class="text">orders-processors</text>
            <text x="650" y="115" text-anchor="middle" class="text">4 Consumers</text>
            
            <!-- Individual Consumers -->
            <rect x="50" y="180" width="120" height="60" rx="8" class="consumer-active"/>
            <text x="110" y="205" text-anchor="middle" class="title">Consumer 1</text>
            <text x="110" y="225" text-anchor="middle" class="text">Partition 0</text>
            
            <rect x="190" y="180" width="120" height="60" rx="8" class="consumer-active"/>
            <text x="250" y="205" text-anchor="middle" class="title">Consumer 2</text>
            <text x="250" y="225" text-anchor="middle" class="text">Partition 1</text>
            
            <rect x="330" y="180" width="120" height="60" rx="8" class="consumer-active"/>
            <text x="390" y="205" text-anchor="middle" class="title">Consumer 3</text>
            <text x="390" y="225" text-anchor="middle" class="text">Partition 2</text>
            
            <rect x="470" y="180" width="120" height="60" rx="8" class="consumer-active"/>
            <text x="530" y="205" text-anchor="middle" class="title">Consumer 4</text>
            <text x="530" y="225" text-anchor="middle" class="text">Partition 3</text>
            
            <!-- Arrows -->
            <line x1="100" y1="120" x2="110" y2="180" class="arrow"/>
            <line x1="220" y1="120" x2="250" y2="180" class="arrow"/>
            <line x1="340" y1="120" x2="390" y2="180" class="arrow"/>
            <line x1="460" y1="120" x2="530" y2="180" class="arrow"/>
            
            <!-- Rebalancing Scenario -->
            <text x="50" y="280" class="title">After Consumer 2 fails:</text>
            
            <rect x="50" y="300" width="120" height="50" rx="8" class="consumer-active"/>
            <text x="110" y="320" text-anchor="middle" class="text">Consumer 1</text>
            <text x="110" y="335" text-anchor="middle" class="text">Partition 0</text>
            
            <rect x="190" y="300" width="120" height="50" rx="8" class="consumer"/>
            <text x="250" y="320" text-anchor="middle" class="text">Consumer 2</text>
            <text x="250" y="335" text-anchor="middle" class="text">FAILED</text>
            
            <rect x="330" y="300" width="120" height="50" rx="8" class="consumer-active"/>
            <text x="390" y="320" text-anchor="middle" class="text">Consumer 3</text>
            <text x="390" y="335" text-anchor="middle" class="text">Partition 1, 2</text>
            
            <rect x="470" y="300" width="120" height="50" rx="8" class="consumer-active"/>
            <text x="530" y="320" text-anchor="middle" class="text">Consumer 4</text>
            <text x="530" y="335" text-anchor="middle" class="text">Partition 3</text>
        </svg>
    `,
    
    'kraft-architecture': `
        <svg width="100%" height="300" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <style>
                    .controller { fill: #dbeafe; stroke: #3b82f6; stroke-width: 2; }
                    .controller-leader { fill: #3b82f6; stroke: #1d4ed8; stroke-width: 2; }
                    .broker { fill: #f3f4f6; stroke: #6b7280; stroke-width: 2; }
                    .text { font-family: Inter, sans-serif; font-size: 12px; fill: #374151; }
                    .text-white { font-family: Inter, sans-serif; font-size: 12px; fill: white; }
                    .title { font-family: Inter, sans-serif; font-size: 14px; font-weight: bold; fill: #111827; }
                    .title-white { font-family: Inter, sans-serif; font-size: 14px; font-weight: bold; fill: white; }
                    .connection { stroke: #6b7280; stroke-width: 2; fill: none; stroke-dasharray: 5,5; }
                </style>
            </defs>
            
            <!-- Title -->
            <text x="400" y="25" text-anchor="middle" class="title">KRaft Mode Architecture</text>
            
            <!-- Controllers -->
            <rect x="50" y="60" width="120" height="80" rx="10" class="controller-leader"/>
            <text x="110" y="85" text-anchor="middle" class="title-white">Controller 1</text>
            <text x="110" y="105" text-anchor="middle" class="text-white">LEADER</text>
            <text x="110" y="125" text-anchor="middle" class="text-white">Metadata</text>
            
            <rect x="200" y="60" width="120" height="80" rx="10" class="controller"/>
            <text x="260" y="85" text-anchor="middle" class="title">Controller 2</text>
            <text x="260" y="105" text-anchor="middle" class="text">FOLLOWER</text>
            <text x="260" y="125" text-anchor="middle" class="text">Metadata</text>
            
            <rect x="350" y="60" width="120" height="80" rx="10" class="controller"/>
            <text x="410" y="85" text-anchor="middle" class="title">Controller 3</text>
            <text x="410" y="105" text-anchor="middle" class="text">FOLLOWER</text>
            <text x="410" y="125" text-anchor="middle" class="text">Metadata</text>
            
            <!-- Brokers -->
            <rect x="550" y="60" width="100" height="60" rx="8" class="broker"/>
            <text x="600" y="85" text-anchor="middle" class="title">Broker 1</text>
            <text x="600" y="105" text-anchor="middle" class="text">Data Storage</text>
            
            <rect x="670" y="60" width="100" height="60" rx="8" class="broker"/>
            <text x="720" y="85" text-anchor="middle" class="title">Broker 2</text>
            <text x="720" y="105" text-anchor="middle" class="text">Data Storage</text>
            
            <!-- Connections -->
            <line x1="170" y1="100" x2="200" y2="100" class="connection"/>
            <line x1="320" y1="100" x2="350" y2="100" class="connection"/>
            <line x1="470" y1="100" x2="550" y2="100" class="connection"/>
            <line x1="470" y1="100" x2="670" y2="100" class="connection"/>
            
            <!-- Benefits -->
            <text x="50" y="200" class="title">KRaft Benefits:</text>
            <text x="50" y="220" class="text">• No ZooKeeper dependency</text>
            <text x="50" y="240" class="text">• Simplified operations</text>
            <text x="50" y="260" class="text">• Better performance</text>
            <text x="50" y="280" class="text">• Improved scalability</text>
            
            <text x="400" y="200" class="title">Raft Consensus:</text>
            <text x="400" y="220" class="text">• Leader election</text>
            <text x="400" y="240" class="text">• Log replication</text>
            <text x="400" y="260" class="text">• Split-brain prevention</text>
            <text x="400" y="280" class="text">• Metadata consistency</text>
        </svg>
    `
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = diagrams;
}
