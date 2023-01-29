let posts = [
  {
    title: "The Best Cordless Jigsaws",
    date: new Date("1/6/2020").toISOString(),
    slug: "best-cordless-jigsaw",
    author: "Ryan",
    coverImage:
      "https://res.cloudinary.com/dfebwzrhb/image/upload/v1609955774/TimberTools/cordless-jigsaws.jpg",
    excerpt:
      "In this article I’ll help you figure out which of the cordless jigsaws that are available on the market today best fits your needs.",
  },
  {
    title: "Table Saw Buying Guide",
    date: new Date("1/5/2020").toISOString(),
    slug: "table-saw-buying-guide",
    author: "Ryan",
    coverImage:
      "https://res.cloudinary.com/dfebwzrhb/image/upload/v1609782090/TimberTools/table-saw-guide.jpg",
    excerpt:
      "We are looking at the types of table saws for sale today and why you should consider each.  We also dig into the best table saws in each category.",
  },
  {
    title: "The Best Table Saw for Less than $500",
    date: new Date("1/4/2020").toISOString(),
    slug: "best-table-saw-for-less-than-500",
    author: "Ryan",
    coverImage:
      "https://res.cloudinary.com/dfebwzrhb/image/upload/v1609858413/TimberTools/table-saw-Hero.jpg",
    excerpt:
      "In this post we take a look at the features you should look for in a sub-$500 table and look at a couple of my favorite saws.",
  },
  {
    title: "Drill like a Pro: The Milescraft 1318 DrillMate Review",
    date: new Date("1/4/2023").toISOString(),
    slug: "milescraft-1318-drillMate",
    author: "Nick",
    coverImage:
      "https://res.cloudinary.com/dfebwzrhb/image/upload/v1673755105/TimberTools/with-door.jpg",
    excerpt:
      "This handy attachment is a game-changer when it comes to drilling perpendicular holes. Whether you're a woodworker, metalworker, or just someone who likes to fix things around the house, this tool is a must-have.",
  },
  {
    title: `Best Wood Router Reviews in ${new Date().getFullYear()}`,
    date: new Date("1/3/2020").toISOString(),
    slug: "best-wood-router-reviews",
    author: "Ryan",
    coverImage:
      "https://res.cloudinary.com/dfebwzrhb/image/upload/v1609559141/TimberTools/Dewalt-Router.jpg",
    excerpt:
      "In this post we take a look at the best Routers on the market in 2021.  A router is a great addition to you woodworking toolkit and can take your production to the next level.",
  },
  {
    title: "Essential Woodworking Tools for Setting Up a Shop on Any Budget",
    date: new Date("12/20/2020").toISOString(),
    slug: "essential-woodworking-tools",
    author: "Ryan",
    coverImage:
      "https://res.cloudinary.com/dfebwzrhb/image/upload/v1609522292/TimberTools/Workshop.jpg",
    excerpt:
      "We look at 4 different budgets to identify the essential woodworking tools for your budget.  ​With each step up in budget, the projects that you will be able to handle will increase in complexity.",
  },
  {
    title: "Bosch 4100 Review – That is One Amazing Stand",
    date: new Date("12/15/2020").toISOString(),
    slug: "bosch-4100-review",
    author: "Ryan",
    coverImage:
      "https://res.cloudinary.com/dfebwzrhb/image/upload/v1609522269/TimberTools/Bosch-Tablesaw.jpg",
    excerpt:
      "The Bosch 4100 is an amazingly versitile table saw that does just about everything right.  It was my first major tool purchase and I'm glad I made the leap.",
  },
  {
    title: "Bosch RA1171 Cabinet Style Router Table Unboxing",
    date: new Date("12/10/2020").toISOString(),
    slug: "bosch-ra1171-router-table-unboxing",
    author: "Ryan",
    coverImage:
      "https://res.cloudinary.com/dfebwzrhb/image/upload/v1609522339/TimberTools/Bosch-RA1171.jpg",
    excerpt:
      "I opened my door this morning to find a package from Amazon.  Imagine my delight when I found the Bosch RA1171 Router Table inside. In this post we are going to open up the table, put it together and I'll let you know what I think.",
  },
  {
    title: "RA1171 Bosch Router Table Review",
    date: new Date("12/5/2020").toISOString(),
    slug: "bosch-router-table-review",
    author: "Ryan",
    coverImage:
      "https://res.cloudinary.com/dfebwzrhb/image/upload/v1609522288/TimberTools/Bosch-RA1171-e1536802362527.jpg",
    excerpt:
      "Bosch's RA1171 is a great all around router table to have around your shop. I've been pleased with the performance and feature set of the Bosch RA1171.",
  },
  {
    title: "Finish and Brad Nailer Uses",
    date: new Date("12/5/2020").toISOString(),
    slug: "finish-and-brad-nailer-uses",
    author: "Ryan",
    coverImage:
      "https://res.cloudinary.com/dfebwzrhb/image/upload/v1609559141/TimberTools/Porter-Cable-Brad-Nailer.jpg",
    excerpt:
      "Let's review the differences between a finish nailer and a brad nailer.  In this post we provide all you need to know about how their different and when to choose one over the other.",
  },
  {
    title: `The Top 13 Gifts for Woodworkers in ${new Date().getFullYear()}`,
    date: new Date("12/5/2020").toISOString(),
    slug: "gifts-for-woodworkers",
    author: "Ryan",
    coverImage:
      "https://res.cloudinary.com/dfebwzrhb/image/upload/v1609522340/TimberTools/Gifts.jpg",
    excerpt:
      "Hunting for a gift for that special woodworker in your life? Check out our list of dream woodworking gifts for every budget.",
  },
  {
    title: "How to Build 2 Cedar Adirondack Chairs in an Afternoon",
    date: new Date("12/1/2020").toISOString(),
    slug: "how-to-build-2-cedar-adirondack-chairs-in-an-afternoon",
    author: "Ryan",
    coverImage:
      "https://res.cloudinary.com/dfebwzrhb/image/upload/v1609522340/TimberTools/Adirondack-Chair-Build-e1536634088898.jpg",
    excerpt:
      "In this post, I'll walk you through how I built my own cedar Adirondak chairs for less than $100 a piece.  The chairs are beautiful, easy to build and I've included free plans.",
  },
  {
    title: "Portable Band Saw Buying Guide",
    date: new Date("11/28/2020").toISOString(),
    slug: "portable-bandsaw-buying-guide",
    author: "Ryan",
    coverImage:
      "https://res.cloudinary.com/dfebwzrhb/image/upload/v1609522288/TimberTools/Portable-Band-Saws.jpg",
    excerpt:
      "Portable Bandsaws are a uniquely flexible tool, able to cut metal, wood, and plastics while leaving a smooth service. On top of that porta bands are easy to handle and manuever around the shop and worksite.",
  },
  {
    title: `Our Top Router Table Reviews of ${new Date().getFullYear()}`,
    date: new Date("11/17/2020").toISOString(),
    slug: "router-table-reviews",
    author: "Ryan",
    coverImage:
      "https://res.cloudinary.com/dfebwzrhb/image/upload/v1609559141/TimberTools/Kreg-Router-Table.jpg",
    excerpt:
      "In this post we look at the best router tables that are available in 2021.  These 4 tables will take your woodworking to the next level.",
  },
  {
    title: "Scroll saw vs Band Saw: Which Should You Buy?",
    date: new Date("11/12/2020").toISOString(),
    slug: "scrollsaw-vs-band-saw",
    author: "Ryan",
    coverImage:
      "https://res.cloudinary.com/dfebwzrhb/image/upload/v1609522271/TimberTools/Scroll-Saw-vs-Band-Saw.jpg",
    excerpt:
      "What's the difference between a Band Saw and a Scroll Saw? In this post we explore the difference between the two so that you can make the right choice for your shop.",
  },
  {
    title: "5 of the Best Router Lift Reviews & Buying Guide",
    date: new Date("11/4/2020").toISOString(),
    slug: "ultimate-router-lift-buying-guide",
    author: "Ryan",
    coverImage:
      "https://res.cloudinary.com/dfebwzrhb/image/upload/v1609559141/TimberTools/Router-Lift-Hero.jpg",
    excerpt:
      "The Woodpeckers PRL-V2 is our absolute favorite router lift. There are two reasons why: 1. the spring loaded motor raising and lower feature that we looked at.",
  },
  {
    title: "WEN 4208 8 Inch Drill Press Unboxing",
    date: new Date("11/1/2020").toISOString(),
    slug: "wen-4208-8-drill-press-unboxing",
    author: "Ryan",
    coverImage:
      "https://res.cloudinary.com/dfebwzrhb/image/upload/v1609559141/TimberTools/wen-4208.jpg",
    excerpt:
      "In this post we are going to be unboxing the WEN 4208 8 inch Drill Press.   This is a great entry level machine that is super easy to get setup and ready for work.  Down below I'd like to provide some insight into why you might actually want to consider adding this tool to your shop.",
  },
  {
    title: "“Do I need a Router Table?” – No, but…",
    date: new Date("10/31/2020").toISOString(),
    slug: "why-you-need-a-router-table",
    author: "Ryan",
    coverImage:
      "https://res.cloudinary.com/dfebwzrhb/image/upload/v1609559141/TimberTools/HandHeld-vs-Table.jpg",
    excerpt:
      "In this post we examine whether or not a router table makes sense in your woodshop.  We'll look at the top uses of a table and help you figure out if one makes sense for you.",
  },
];

export default posts;
