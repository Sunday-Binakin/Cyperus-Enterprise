import { BlogPost, RelatedPost } from '@/app/types/blog';

// Extended blog data with full content
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "health-benefits-tigernut-milk",
    title: "The Health Benefits of Tigernut Milk",
    description: "Discover why tigernut milk is becoming a popular dairy-free alternative and learn about its amazing nutritional benefits.",
    excerpt: "Discover why tigernut milk is becoming a popular dairy-free alternative...",
    content: `
      <h2>What Makes Tigernut Milk Special?</h2>
      <p>Tigernut milk has been consumed for centuries, but it's only recently gained popularity as a superfood alternative to dairy milk. This nutrient-dense beverage offers a unique combination of health benefits that make it stand out from other plant-based milk alternatives.</p>
      
      <h3>Nutritional Powerhouse</h3>
      <p>Unlike many plant-based milks, tigernut milk is naturally rich in:</p>
      <ul>
        <li><strong>Fiber:</strong> Supporting digestive health and promoting satiety</li>
        <li><strong>Healthy Fats:</strong> Including monounsaturated fats that support heart health</li>
        <li><strong>Minerals:</strong> Magnesium, phosphorus, and potassium for bone and muscle function</li>
        <li><strong>Vitamin E:</strong> A powerful antioxidant that protects cells from damage</li>
      </ul>
      
      <h3>Perfect for Special Diets</h3>
      <p>Tigernut milk is naturally:</p>
      <ul>
        <li>Dairy-free and lactose-free</li>
        <li>Nut-free (despite the name, tigernuts are actually tubers)</li>
        <li>Gluten-free</li>
        <li>Paleo-friendly</li>
        <li>Vegan and plant-based</li>
      </ul>
      
      <h3>How to Incorporate Tigernut Milk</h3>
      <p>You can enjoy tigernut milk in many ways:</p>
      <ul>
        <li>Drink it straight as a refreshing beverage</li>
        <li>Add it to smoothies for extra creaminess</li>
        <li>Use it in baking as a dairy milk substitute</li>
        <li>Pour it over cereal or granola</li>
        <li>Create delicious tigernut milk lattes</li>
      </ul>
      
      <h3>The Cyperus Difference</h3>
      <p>At Cyperus Enterprise, we source our tigernuts from sustainable farms and use traditional methods to create the highest quality tigernut milk. Our process preserves all the natural nutrients while ensuring a delicious, creamy taste that you'll love.</p>
    `,
    image: "/images/clients/products/footer/ginger.jpg",
    category: "Health & Wellness",
    categoryColor: "#4A651F",
    author: {
      name: "Dr. Sarah Johnson",
      avatar: "/images/clients/authors/sarah-johnson.jpg",
      bio: "Nutritionist and wellness expert with over 10 years of experience in plant-based nutrition."
    },
    publishedAt: "2024-01-15",
    updatedAt: "2024-01-15",
    readTime: 5,
    tags: ["tigernut", "dairy-free", "nutrition", "health", "plant-based"],
    featured: true,
    published: true,
    seo: {
      metaTitle: "The Amazing Health Benefits of Tigernut Milk | Cyperus Enterprise",
      metaDescription: "Discover why tigernut milk is the perfect dairy-free alternative. Learn about its nutritional benefits, versatility, and how to incorporate it into your diet.",
      keywords: ["tigernut milk", "dairy-free", "plant-based milk", "nutrition", "health benefits"]
    }
  },
  {
    id: 2,
    slug: "tigernut-flour-recipes",
    title: "5 Delicious Ways to Use Tigernut Flour",
    description: "Explore creative recipes and cooking tips using our premium tigernut flour for healthier baking and cooking.",
    excerpt: "Explore creative recipes and cooking tips using our premium tigernut flour.",
    content: `
      <h2>Revolutionize Your Baking with Tigernut Flour</h2>
      <p>Tigernut flour is a game-changer for anyone looking to create healthier, more nutritious baked goods. This naturally sweet, nutty flour brings unique flavors and incredible health benefits to your kitchen.</p>
      
      <h3>1. Fluffy Tigernut Pancakes</h3>
      <p>Start your morning right with these protein-rich pancakes:</p>
      <ul>
        <li>1 cup tigernut flour</li>
        <li>2 eggs</li>
        <li>1 cup tigernut milk</li>
        <li>1 tsp vanilla extract</li>
        <li>1 tsp baking powder</li>
        <li>Pinch of salt</li>
      </ul>
      <p>Mix ingredients and cook on medium heat for golden, fluffy pancakes that are naturally gluten-free and paleo-friendly.</p>
      
      <h3>2. Decadent Chocolate Tigernut Cookies</h3>
      <p>These cookies prove that healthy can be indulgent:</p>
      <ul>
        <li>2 cups tigernut flour</li>
        <li>1/2 cup coconut oil</li>
        <li>1/2 cup maple syrup</li>
        <li>1/4 cup cocoa powder</li>
        <li>1 tsp vanilla</li>
        <li>Dark chocolate chips</li>
      </ul>
      
      <h3>3. Crispy Tigernut Crusted Chicken</h3>
      <p>Create a delicious gluten-free coating:</p>
      <p>Mix tigernut flour with herbs and spices for a crispy, flavorful coating that's much healthier than traditional breadcrumbs.</p>
      
      <h3>4. Smooth Tigernut Flour Smoothies</h3>
      <p>Add 2 tablespoons of tigernut flour to your favorite smoothie for extra fiber, protein, and a subtle sweet flavor.</p>
      
      <h3>5. Traditional Tigernut Flour Bread</h3>
      <p>Bake nutrient-dense bread that's perfect for those with gluten sensitivities. The natural sweetness of tigernut flour reduces the need for added sugars.</p>
      
      <h3>Baking Tips</h3>
      <ul>
        <li>Tigernut flour absorbs more liquid than regular flour - adjust accordingly</li>
        <li>It has a naturally sweet taste, so reduce other sweeteners</li>
        <li>Store in an airtight container for maximum freshness</li>
        <li>Combine with other gluten-free flours for varied textures</li>
      </ul>
    `,
    image: "/images/clients/products/footer/lemon-grass.jpg",
    category: "Recipes",
    categoryColor: "#4A651F",
    author: {
      name: "Chef Maria Rodriguez",
      avatar: "/images/clients/authors/maria-rodriguez.jpg",
      bio: "Professional chef specializing in healthy, gluten-free cuisine and plant-based cooking."
    },
    publishedAt: "2024-01-20",
    updatedAt: "2024-01-20",
    readTime: 7,
    tags: ["tigernut flour", "recipes", "baking", "gluten-free", "healthy cooking"],
    featured: true,
    published: true,
    seo: {
      metaTitle: "5 Amazing Tigernut Flour Recipes | Healthy Baking Guide",
      metaDescription: "Discover 5 delicious ways to use tigernut flour in your baking. From pancakes to cookies, learn how to create healthier treats with this superfood flour.",
      keywords: ["tigernut flour recipes", "gluten-free baking", "healthy recipes", "paleo baking"]
    }
  },
  {
    id: 3,
    slug: "sustainable-tigernut-farming",
    title: "The Future of Sustainable Farming",
    description: "How tigernut farming is helping communities and the environment while providing nutritious food for the future.",
    excerpt: "How tigernut farming is helping communities and the environment...",
    content: `
      <h2>Tigernuts: A Crop for the Future</h2>
      <p>As we face increasing environmental challenges and the need for sustainable food production, tigernuts emerge as a remarkable solution that benefits both people and the planet.</p>
      
      <h3>Environmental Benefits</h3>
      <p>Tigernut farming offers numerous environmental advantages:</p>
      <ul>
        <li><strong>Water Efficiency:</strong> Tigernuts require significantly less water than traditional crops</li>
        <li><strong>Soil Health:</strong> The root system improves soil structure and prevents erosion</li>
        <li><strong>Carbon Sequestration:</strong> Helps capture and store carbon in the soil</li>
        <li><strong>Biodiversity:</strong> Supports beneficial insects and soil microorganisms</li>
      </ul>
      
      <h3>Community Impact</h3>
      <p>Sustainable tigernut farming creates positive change in farming communities:</p>
      <ul>
        <li>Provides stable income for smallholder farmers</li>
        <li>Requires minimal external inputs, reducing costs</li>
        <li>Creates employment opportunities throughout the value chain</li>
        <li>Preserves traditional farming knowledge</li>
      </ul>
      
      <h3>Climate Resilience</h3>
      <p>Tigernuts are naturally adapted to challenging conditions:</p>
      <ul>
        <li>Drought tolerant once established</li>
        <li>Resistant to many common pests and diseases</li>
        <li>Can grow in various soil types</li>
        <li>Tolerates temperature fluctuations</li>
      </ul>
      
      <h3>Our Commitment at Cyperus</h3>
      <p>At Cyperus Enterprise, we work directly with farmers to implement sustainable practices:</p>
      <ul>
        <li>Training in organic farming methods</li>
        <li>Fair trade partnerships</li>
        <li>Investment in community infrastructure</li>
        <li>Support for women farmers</li>
      </ul>
      
      <h3>The Path Forward</h3>
      <p>By choosing tigernut products, consumers support a more sustainable food system that benefits farmers, communities, and the environment. Every purchase contributes to a future where healthy food production goes hand in hand with environmental stewardship.</p>
    `,
    image: "/images/clients/products/footer/choconut.jpg",
    category: "Sustainability",
    categoryColor: "#059669",
    author: {
      name: "Dr. James Okafor",
      avatar: "/images/clients/authors/james-okafor.jpg",
      bio: "Agricultural scientist and sustainability expert with focus on African crops and climate-resilient farming."
    },
    publishedAt: "2024-01-25",
    updatedAt: "2024-01-25",
    readTime: 6,
    tags: ["sustainability", "farming", "environment", "community", "climate"],
    featured: false,
    published: true,
    seo: {
      metaTitle: "Sustainable Tigernut Farming: Building a Better Future",
      metaDescription: "Learn how tigernut farming supports sustainable agriculture, helps communities, and protects the environment for future generations.",
      keywords: ["sustainable farming", "tigernut agriculture", "environmental benefits", "community development"]
    }
  }
];

// Blog service functions
export class BlogService {
  static getAllPosts(): BlogPost[] {
    return blogPosts.filter(post => post.published);
  }

  static getPostBySlug(slug: string): BlogPost | null {
    return blogPosts.find(post => post.slug === slug && post.published) || null;
  }

  static getFeaturedPosts(): BlogPost[] {
    return blogPosts.filter(post => post.featured && post.published);
  }

  static getRelatedPosts(currentPostId: number, category: string, limit: number = 3): RelatedPost[] {
    return blogPosts
      .filter(post => 
        post.id !== currentPostId && 
        post.category === category && 
        post.published
      )
      .slice(0, limit)
      .map(post => ({
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        image: post.image,
        category: post.category,
        publishedAt: post.publishedAt,
        readTime: post.readTime
      }));
  }

  static getPostsByCategory(category: string): BlogPost[] {
    return blogPosts.filter(post => post.category === category && post.published);
  }

  static getPostsByTag(tag: string): BlogPost[] {
    return blogPosts.filter(post => post.tags.includes(tag) && post.published);
  }

  static getAllSlugs(): string[] {
    return blogPosts.filter(post => post.published).map(post => post.slug);
  }

  static searchPosts(query: string): BlogPost[] {
    const lowercaseQuery = query.toLowerCase();
    return blogPosts.filter(post => 
      post.published && (
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.description.toLowerCase().includes(lowercaseQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      )
    );
  }
}
