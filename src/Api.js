import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3003',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (error) => Promise.reject(error));


class Api {
  static getData(page) {
    return api.get(`/products/?page=${page}`);
  }

  static productCat(cat_id) {
    return api.get(`/products`, {
      params: {
        ...cat_id
      }
    })
  }

  static singleProduct(id) {
    return api.get(`/products/${id}`);
  }

  static searchProducts(search) {
    return api.get('/products', {
      params: {
      ...search
      }
    })
  };

  static addProduct(data) {
    return api.post('/products/', data)
  }

  static deleteProduct(id) {
    return api.delete(`/products/${id}`)
  }


static updateProduct(data) {
  return api.put(`/products/${data.id}`, data)
}


  static basketList() {
    return api.get('/basket/list');
  }


  static basketAdd(id) {
    return api.put(`/basket/${id}`);
  }


  static basketCreate(data) {
    return api.post(`/basket/create`, data);
  }

  static basketRemove(id) {
    return api.delete(`/basket/${id}`);
  }

  static basketId(id) {
    return api.get(`/basket/list/${id}`);
  }


  static registration(data) {
    return api.post('/users/', data);
  }


  static login(data) {
    return api.post('/users/login', data);
  }



  static categoryList() {
    return api.get('/categories/');
  }

  static categoryChild(id) {
    return api.get('/categories/', id);
  }

  static addCategory(data) {
    return api.post('/categories/', data)
  }


  static deleteCategory(id) {
    return api.delete(`/categories/${id}`)
  }

  static updateCategory(id) {
    return api.put(`/categories/${id}`, id)
  }


  static likes(data) {
    return api.post('/likes/', data);
  }


  static likeList() {
    return api.get('/likes/',)
  }

  static removeLike(id) {
    return api.delete(`/likes/${id}`);
  }


  static rating(data) {
    return api.post('/rating/', data)
  }

static ratingList(id) {
  return api.get(`/rating/${id}`)
}



  static paymentToken(data) {
    return api.get('/orders/client-secret', {
      params: {
        ...data
      }
    })
  }

static confirmPayment(data) {
  return api.post('/orders/confirm', data)
}

}

export default Api;