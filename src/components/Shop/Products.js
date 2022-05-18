import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    title: "book",
    price: 6,
    description: "My first book",
  },
  {
    id: "p2",
    title: "book 2",
    price: 12,
    description: "My 2nd book",
  },
  {
    id: "p3",
    title: "book 3",
    price: 10,
    description: "My 3rd book",
  },
];

const products = DUMMY_PRODUCTS.map((item) => {
  return (
    <ProductItem
      title={item.title}
      price={item.price}
      description={item.description}
      id={item.id}
      key={item.id}
    ></ProductItem>
  );
});

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>{products}</ul>
    </section>
  );
};

export default Products;
