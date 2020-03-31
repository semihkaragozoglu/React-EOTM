export const apiUrl = "http://localhost:9002/graphql?query=";
export const queryAllEmployees = `{
    allEmployees {
      id
      firstName
      lastName
      photo
      department {
        id
        name
      },
      voteCount
    }
  }`;

export const queryEmployeeById = id => `
{
  employee(id:"${id}") {
    address
    company {
      id
      name
    }
    about
    email
    phone
  }
} 
  `;
