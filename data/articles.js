// Articles data
const ARTICLES = [
  {
    id: '1',
    slug: 'community-gathering-fellowship',
    title: 'Community Gathering and Fellowship',
    date: '2025-08-15',
    author: 'Rev. Sarah Johnson',
    tags: ['community', 'fellowship'],
    excerpt: 'Join us for a simple time of prayer, songs, and tea as we strengthen the bonds of our church family.',
    image: {
      src: 'assets/images/article-1.jpg',
      alt: 'Church community gathering with people sharing tea and conversation'
    },
    contentHtml: `
      <p>There is something profoundly beautiful about gathering together as a community of faith. This month, we were blessed to share an evening of fellowship that reminded us of the importance of connection, prayer, and simple joy in one another's company.</p>
      
      <p>Our community gathering brought together members from all walks of life, united in our shared faith and commitment to supporting one another. The evening began with a time of quiet prayer, allowing us to center ourselves and open our hearts to God's presence among us.</p>
      
      <h2>Activities and Connections</h2>
      <p>The evening included several meaningful activities that helped deepen our connections:</p>
      <ul>
        <li>Shared prayer and reflection time</li>
        <li>Traditional hymns and contemporary songs</li>
        <li>Tea and light refreshments</li>
        <li>Small group conversations</li>
        <li>Planning for upcoming community service projects</li>
      </ul>
      
      <p>These gatherings remind us that faith is not just an individual journey, but a communal one. In sharing our stories, our hopes, and our challenges, we find strength and encouragement that sustains us throughout the week.</p>
      
      <p>We look forward to our next gathering and invite all members of our community to join us. Whether you've been part of St. Mary's for decades or are just beginning to explore faith, you are welcome at our table.</p>
    `
  },
  {
    id: '2',
    slug: 'serving-our-neighbors',
    title: 'Serving Our Neighbors',
    date: '2025-07-01',
    author: 'Margaret Chen',
    tags: ['service', 'outreach'],
    excerpt: 'A reflection on practical ways we can care for our city and extend Christ\'s love to those around us.',
    image: {
      src: 'assets/images/article-2.jpg',
      alt: 'Volunteers preparing meals for community outreach'
    },
    contentHtml: `
      <p>The call to serve our neighbors is at the heart of the Christian faith. As a church community, we are continually seeking ways to extend Christ's love beyond our walls and into the streets of Mandalay.</p>
      
      <p>Service takes many forms, and we have discovered that some of the most meaningful acts of care are also the simplest. Whether it's preparing a meal for a family in need, visiting elderly members of our community, or offering practical support to those facing difficult circumstances, every act of service reflects God's love.</p>
      
      <h2>Current Service Initiatives</h2>
      <p>Our church is currently involved in several ongoing service projects that allow us to make a positive impact in our community:</p>
      
      <p><strong>Meal Preparation:</strong> Each month, volunteers gather to prepare meals for families experiencing hardship. This ministry has grown from a small group of dedicated members to a community-wide effort that feeds dozens of families.</p>
      
      <p><strong>Elder Care:</strong> Our pastoral care team regularly visits elderly members of our congregation and community, providing companionship, prayer, and practical assistance with daily tasks.</p>
      
      <p><strong>Community Support:</strong> We maintain a fund to help with emergency needs such as medical expenses, temporary housing assistance, and educational support for children in our community.</p>
      
      <h2>The Joy of Giving</h2>
      <p>What we consistently discover in our service work is that we receive far more than we give. In caring for others, we encounter Christ in new and unexpected ways. We learn about resilience, gratitude, and the profound dignity of every human being.</p>
      
      <p>If you feel called to join us in serving our neighbors, we welcome your participation. There are opportunities for every schedule, skill set, and comfort level. Together, we can make a meaningful difference in the lives of those around us.</p>
    `
  },
  {
    id: '3',
    slug: 'sermon-series-hope-faith',
    title: 'Sermon Series: Hope and Faith',
    date: '2025-06-10',
    author: 'Rev. David Thompson',
    tags: ['worship', 'teaching'],
    excerpt: 'Exploring themes of hope and faith in everyday life through Scripture and shared reflection.',
    image: {
      src: 'assets/images/article-3.jpg',
      alt: 'Open Bible on church pulpit with stained glass window in background'
    },
    contentHtml: `
      <p>Faith and hope are not mere concepts to be understood intellectually, but living realities that shape how we navigate the joys and challenges of daily life. Our recent sermon series has explored these foundational themes through Scripture, prayer, and community reflection.</p>
      
      <p>Over the course of six weeks, we have journeyed through biblical passages that illuminate the nature of faith and hope, examining how these gifts from God can transform our perspective and strengthen our resolve in difficult times.</p>
      
      <h2>Weekly Themes</h2>
      <p>Each week of our series focused on a different aspect of faith and hope:</p>
      
      <p><strong>Week 1: Faith as Trust</strong><br>
      We explored how faith is fundamentally about trust in God's character and promises, even when circumstances are uncertain.</p>
      
      <p><strong>Week 2: Hope in Adversity</strong><br>
      Through the stories of biblical figures who faced tremendous challenges, we learned about hope that persists even in the darkest moments.</p>
      
      <p><strong>Week 3: Community of Faith</strong><br>
      We examined how faith is strengthened and sustained through community, and how we can support one another in our spiritual journeys.</p>
      
      <p><strong>Week 4: Active Hope</strong><br>
      This week focused on hope as more than passive waiting, but as an active force that motivates us to work for justice and healing in our world.</p>
      
      <p><strong>Week 5: Faith in Daily Life</strong><br>
      We discussed practical ways to live out our faith in everyday situations, from family relationships to work responsibilities.</p>
      
      <p><strong>Week 6: Hope for the Future</strong><br>
      Our final week looked at the ultimate hope we have in God's kingdom and how that hope shapes our present actions and attitudes.</p>
      
      <h2>Continuing the Conversation</h2>
      <p>While our formal sermon series has concluded, the conversation about faith and hope continues in our small groups, prayer meetings, and daily interactions. We encourage all members of our community to reflect on how these themes apply to their own spiritual journey.</p>
      
      <p>If you missed any of the sermons in this series, recordings are available, and we would be happy to discuss these themes with you personally. Faith and hope are gifts that grow stronger when shared with others.</p>
    `
  }
];

// Make articles available globally
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ARTICLES;
}