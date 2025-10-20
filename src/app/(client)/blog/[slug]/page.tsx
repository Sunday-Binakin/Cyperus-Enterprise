import React from 'react';
import BlogPostPageClient from '@/components/features/blog/BlogPostPage';

// Blog data (in a real app, this would come from a CMS or database)
const blogPosts = [
  {
    id: 1,
    slug: 'health-benefits-tigernut-milk',
    image: "/images/clients/products/footer/ginger.jpg",
    category: "Health & Wellness",
    title: "The Health Benefits of Tigernut Milk",
    description: "Discover why tigernut milk is becoming a popular dairy-free alternative packed with nutrients and health benefits.",
    excerpt: "Explore the amazing nutritional profile of tigernut milk and how it can boost your health naturally.",
    content: `
      <h2>What Makes Tigernut Milk Special?</h2>
      <p>Tigernut milk has been gaining popularity as a nutritious, dairy-free alternative that offers numerous health benefits. This ancient superfood is packed with essential nutrients that support overall wellness.</p>
      
      <h3>Key Nutritional Benefits</h3>
      <ul>
        <li><strong>Rich in Fiber:</strong> Promotes digestive health and helps maintain stable blood sugar levels</li>
        <li><strong>High in Healthy Fats:</strong> Contains beneficial omega-3 and omega-6 fatty acids</li>
        <li><strong>Vitamin E:</strong> Powerful antioxidant that supports skin health and immune function</li>
        <li><strong>Minerals:</strong> Good source of potassium, magnesium, and iron</li>
      </ul>
      
      <h3>Health Benefits</h3>
      <p>Regular consumption of tigernut milk may help with:</p>
      <ul>
        <li>Improved digestive health</li>
        <li>Better heart health</li>
        <li>Enhanced immune function</li>
        <li>Stable blood sugar levels</li>
        <li>Increased energy levels</li>
      </ul>
      
      <h3>How to Incorporate Tigernut Milk</h3>
      <p>You can easily add tigernut milk to your diet by:</p>
      <ul>
        <li>Using it in smoothies and shakes</li>
        <li>Adding to cereals and oatmeal</li>
        <li>Using in baking recipes</li>
        <li>Drinking it as a refreshing beverage</li>
      </ul>
      
      <p>With its sweet, nutty flavor and impressive nutritional profile, tigernut milk is an excellent choice for anyone looking to improve their health naturally.</p>
    `,
    readTime: 5,
    publishedAt: "2024-01-15",
    author: {
      name: "Dr. Sarah Johnson",
      avatar: "/images/clients/team/author1.jpg",
      bio: "Nutritionist and wellness expert with 10+ years of experience in natural health."
    },
    tags: ["nutrition", "health", "dairy-free", "wellness"],
    categoryColor: "#4A651F"
  },
  {
    id: 2,
    slug: 'delicious-ways-tigernut-flour',
    image: "/images/clients/products/footer/lemon-grass.jpg",
    category: "Recipes",
    title: "5 Delicious Ways to Use Tigernut Flour",
    description: "Explore creative recipes and cooking tips using our premium tigernut flour for healthy baking.",
    excerpt: "Transform your baking with these innovative tigernut flour recipes that are both healthy and delicious.",
    content: `
      <h2>Transform Your Baking with Tigernut Flour</h2>
      <p>Tigernut flour is a versatile, gluten-free alternative that adds a naturally sweet, nutty flavor to your favorite recipes. Here are five delicious ways to incorporate this superfood into your cooking.</p>
      <h3>1. Tigernut Flour Pancakes</h3>
      <p>Start your morning with fluffy, nutritious pancakes that are naturally sweet and satisfying.</p>
      <ul>
        <li>2 cups tigernut flour</li>
        <li>1 cup almond milk</li>
        <li>2 eggs</li>
        <li>1 tsp vanilla extract</li>
        <li>1 tsp baking powder</li>
      </ul>
      <h3>2. Chocolate Chip Cookies</h3>
      <p>Create guilt-free cookies that are both delicious and nutritious.</p>
      <h3>3. Bread and Muffins</h3>
      <p>Replace traditional flour with tigernut flour for a healthier twist on classic baked goods.</p>
      <h3>4. Energy Balls</h3>
      <p>Perfect for on-the-go snacking and post-workout fuel.</p>
      <h3>5. Pie Crusts</h3>
      <p>Create a naturally sweet, gluten-free pie crust that complements any filling.</p>
      <p>Each of these recipes showcases the versatility of tigernut flour while providing essential nutrients and natural sweetness to your favorite treats.</p>
    `,
    readTime: 8,
    publishedAt: "2024-01-10",
    author: {
      name: "Chef Maria Rodriguez",
      avatar: "/images/clients/team/author2.jpg",
      bio: "Professional chef specializing in healthy, plant-based cuisine."
    },
    tags: ["recipes", "baking", "gluten-free", "cooking"],
    categoryColor: "#4A651F"
  },
  {
    id: 3,
    slug: 'future-sustainable-farming',
    image: "/images/clients/products/footer/choconut.jpg",
    category: "Sustainability",
    title: "The Future of Sustainable Farming",
    description: "How tigernut farming is helping communities and the environment through sustainable agricultural practices.",
    excerpt: "Learn how tigernut cultivation is revolutionizing sustainable farming and supporting local communities.",
    content: `
      <h2>Tigernuts: A Sustainable Solution</h2>
      <p>As the world faces increasing environmental challenges, tigernut farming emerges as a beacon of sustainable agriculture that benefits both communities and the planet.</p>
      <h3>Environmental Benefits</h3>
      <ul>
        <li><strong>Water Efficiency:</strong> Tigernuts require significantly less water than traditional crops</li>
        <li><strong>Soil Health:</strong> Helps prevent soil erosion and improves soil structure</li>
        <li><strong>Carbon Sequestration:</strong> Contributes to reducing atmospheric CO2</li>
        <li><strong>Biodiversity:</strong> Supports diverse ecosystems and wildlife habitats</li>
      </ul>
      <h3>Community Impact</h3>
      <ul>
        <li>Provides sustainable income for farmers</li>
        <li>Creates job opportunities in processing and distribution</li>
        <li>Supports local economies</li>
        <li>Preserves traditional farming knowledge</li>
      </ul>
      <h3>The Future of Agriculture</h3>
      <p>As we look toward the future, tigernut farming represents a model for sustainable agriculture that can help address global food security while protecting our environment.</p>
    `,
    readTime: 6,
    publishedAt: "2024-01-05",
    author: {
      name: "Prof. Michael Green",
      avatar: "/images/clients/team/author3.jpg",
      bio: "Agricultural scientist and sustainability researcher."
    },
    tags: ["sustainability", "farming", "environment", "community"],
    categoryColor: "#059669"
  }
];

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  
  const relatedPosts = blogPosts
    .filter(p => p.id !== post?.id && p.category === post?.category)
    .slice(0, 3);

  return <BlogPostPageClient post={post} relatedPosts={relatedPosts} />;
}
