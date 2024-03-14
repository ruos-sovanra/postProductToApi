import { useEffect, useState } from "react";
import "./App.css";
import CardComponent from "./components/CardComponent";
import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";
import { Button, Modal, Spinner } from "flowbite-react";
import FormComponent from "./components/FormComponent";

type Status = "idle" | "loading" | "success" | "error";
type Product = {
  readonly id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [openModal, setOpenModal] = useState(false);
  const [dataForm, setDataForm] = useState({});

  useEffect(() => {
    setStatus("loading");
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setStatus("success");
      })
      .catch((err) => {
        setStatus("error");
      });
  }, []);
  if (status === "loading")
    return (
      <h1 className="h-screen grid place-content-center text-6xl">
        <Spinner aria-label="Default status example" />
      </h1>
    );

  function getDataForm(product: any) {
    setDataForm(product);
  }
  const createProduct = async () => {
    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify(dataForm),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  return (
    <>
      <NavbarComponent />
      <div className="mx-auto container grid place-content-center mb-2">
        <Button onClick={() => setOpenModal(true)}>Create Product</Button>
      </div>
      <div className="container mx-auto grid grid-cols-3 gridd-flow-row gap-4">
        {products.map((product) => (
          <CardComponent
            key={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
          />
        ))}
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Create New Product</Modal.Header>
        <Modal.Body>
          <FormComponent getDataForm={getDataForm} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => createProduct()}>Create</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <FooterComponent />
    </>
  );
}

export default App;
