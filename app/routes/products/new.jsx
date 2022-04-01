import { Link, redirect, useActionData, Form } from "remix";

export async function action({ request }) {
    const body = await request.formData();
    const title= body.get('title');
    const description= body.get('description');
    const values = {title, description};
    const errors = {};
    if(!title) {
        errors.title = 'Title is required.';
    }
    if(Object.keys(errors).length > 0) {
        return {errors, values};
    }

    await fetch("http://localhost:8000/products", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)
    });
    return redirect("/products");
}

export default function NewProducts() {
    const actionData = useActionData();
    console.log('>>', actionData);
    return <>
        <h1>New Product</h1>
        <Form method="post" action="/products/new">
            <div>
                <label>Name</label>
                <div><input type="text" name="title" /></div>
                <p>{actionData?.errors.title ?? null}</p>
            </div>
            <div>
                <label>Description</label>
                <div><input type="text" name="description" /></div>
                <p>{actionData?.errors.description ?? null}</p>
            </div>
            <div>
                <button type="submit">Save</button>
            </div>
        </Form>
    </>;
}
