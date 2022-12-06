const { query } = require("express");
const express = require("express");
const app = express();

const server = app.listen(3001, () => {
  console.log("listening on port");
});

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

/**
 * Products
 * GET     /products                200  +
 * GET     /products?category=...   200  +
 * GET     /products/:id            200  +
 *
 * //   Categories
 * //   GET    /categories                    200
 * //   GET    /categories/:category/products 200
 *
 * User Accounts
 * GEt     /users/:id               200
 * POST    /users                   201
 * PUT     /users/:id               204
 * DELETE  /users/:id               204
 *
 * Orders
 * GET     /users/:id/orders        200
 * GET     /users/:id/orders/:id    200
 * POST    /users/:id/orders        201
 * PUT     /users/:id/orders/:id    204
 * DELETE  /users/:id/orders/:id    204
 */

const products = [
  {
    id: 1,
    name: "Fernseher",
    description: "aksjd lsdjf ldsf",
    price: "350€",
    categories: ["technology", "home"],
  },
  {
    id: 2,
    name: "Computer",
    description: "kldf lsdjf ldsf",
    price: "650€",
    categories: ["technology", "home", "job"],
  },
  {
    id: 3,
    name: "Teppich",
    description: "gsgdf lsdjf ldsf",
    price: "50€",
    categories: ["home"],
  },
  {
    id: 4,
    name: "desk",
    description: "aksfg jdhfj ldsf",
    price: "150€",
    categories: ["furniture", "home"],
  },
  {
    id: 5,
    name: "Shampoo",
    description: "aksjd lsdjf asdf",
    price: "3€",
    categories: ["health", "care"],
  },
  {
    id: 6,
    name: "Couch",
    description: "erdfd lsdjf ldsf",
    price: "250€",
    categories: ["furniture", "home"],
  },
  {
    id: 7,
    name: "pasta",
    description: "gfhf lsdjf ldsf",
    price: "1€",
    categories: ["food", "kitchen"],
  },
  {
    id: 8,
    name: "Black Tea",
    description: "aksjd sldlas ldsf",
    price: "12€",
    categories: ["food", "kitchen"],
  },
];

const users = [
  {
    id: 1,
    firstName: "Shannah",
    lastName: "Curton",
    email: "scurton0@weather.com",
    age: 46,
    orders: [
      {
        orderNum: "123",
        orderDate: "2022-04-05",
        product: products[1],
        numOfOrderedProducts: 1,
      },
      {
        orderNum: "234",
        orderDate: "2022-07-12",
        product: products[2],
        numOfOrderedProducts: 2,
      },
    ],
  },
  {
    id: 2,
    firstName: "Arvie",
    lastName: "Stading",
    email: "astading1@drupal.org",
    age: 39,
    orders: [
      {
        orderNum: "345",
        orderDate: "2022-08-15",
        product: products[4],
        numOfOrderedProducts: 3,
      },
      {
        orderNum: "456",
        orderDate: "2022-09-17",
        product: products[7],
        numOfOrderedProducts: 2,
      },
    ],
  },
  {
    id: 3,
    firstName: "Cassandry",
    lastName: "Parcells",
    email: "cparcells2@foxnews.com",
    age: 23,
    orders: [
      {
        orderNum: "567",
        orderDate: "2022-10-25",
        product: products[6],
        numOfOrderedProducts: 3,
      },
      {
        orderNum: "678",
        orderDate: "2022-11-27",
        product: products[5],
        numOfOrderedProducts: 1,
      },
      {
        orderNum: "789",
        orderDate: "2022-12-12",
        product: products[3],
        numOfOrderedProducts: 2,
      },
    ],
  },
];

app.get("/products", (req, res) => {
  const category = req.query.category;

  if (category) {
    const filteredProducts = products.filter((product) =>
      product.categories.includes(category)
    );

    return res.send(filteredProducts);
  }

  res.send(products);
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;

  const product = products.find((product) => product.id === +id);

  res.send(product);
});

app.use((req, res) => {
  console.error(`${req.url} not found`);
  res.status(404).end();
});
