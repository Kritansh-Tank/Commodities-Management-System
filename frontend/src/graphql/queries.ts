import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      accessToken
      userId
      email
      name
      role
      avatar
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts($page: Int, $limit: Int, $filter: ProductFilterInput) {
    products(page: $page, limit: $limit, filter: $filter) {
      items {
        id
        name
        description
        tags
        price
        discount
        discountCategory
        status
        views
        revenue
        thumbnailUrl
        previewUrl
        categoryId
        category {
          id
          name
        }
        createdAt
        updatedAt
      }
      total
      page
      limit
      totalPages
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      name
      description
      tags
      price
      discount
      discountCategory
      status
      views
      revenue
      thumbnailUrl
      previewUrl
      categoryId
      category {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: String!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: String!) {
    deleteProduct(id: $id)
  }
`;

export const GET_DASHBOARD_STATS = gql`
  query GetDashboardStats {
    dashboardStats {
      cards {
        title
        value
        change
        changeLabel
      }
      overviewChart {
        label
        data {
          label
          value
        }
      }
      recentSales {
        name
        email
        amount
        avatar
      }
      statsCharts {
        label
        data {
          label
          value
        }
      }
      subscriptionPerformers
      topProducts {
        name
        email
        amount
      }
      paymentHistory {
        name
        email
        amount
      }
    }
  }
`;
