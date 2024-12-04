import API_BASE_URL from "./api_temp"

const API_SLUG = (slug: string) => {
    return `${API_BASE_URL}/api/v1/lendingPost${slug}`
};

export const fetchLendingPosts = async () => {
    try {
      const response = await fetch(API_SLUG('?active=true'), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
  
      if (!response.ok) {
        throw new Error('Error al obtener préstamos');
      }
     
      const data = await response.json();
      return data.loans;
    } catch (error) {
      throw error;
    }
  };
  
  export const fetchLendingPostRequirements = async (lendingPostId: string) => {
    try {
      const response = await fetch(API_SLUG(`/requirements?lendingPostId=${lendingPostId}`), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error al obtener los requisitos del préstamo con ID ${lendingPostId}`);
      }
  
      const data = await response.json();
      return data.requirements;
    } catch (error) {
      throw error;
    }
  };

  export const fetchLendingPostsByUserId = async (userId: string) => {
    try {
      const response = await fetch(API_SLUG(`?userId=${userId}`), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener préstamos por ID de usuario');
      }

      const data = await response.json();
      return data.loans;
    } catch (error) {
      console.error('Error al obtener préstamos por ID de usuario:', error);
      throw error;
    }
  };

  export const fetchLendingPostByLendingPostId = async (lendingPostId: string) => {
    try {
      // console.log("fetchLendingPostByLendingPostId", lendingPostId)
      const response = await fetch(API_SLUG(`?Id=${lendingPostId}`), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error al obtener préstamo con ID ${lendingPostId}`);
      }

      const data = await response.json();
      return data.loans[0];
    } catch (error) {
      console.error(`Error al obtener préstamo con ID ${lendingPostId}:`, error);
      throw error;
    }
  }
  
  
  export const createLendingPostAndRequirements = async (
    lenderId: string,
    initialAmount: number,
    availableAmount: number,
    interest: number,
    deadline: string,
    requirements: Array<{ name: string; completed: boolean }>,
    quotas: number
  ) => {
    
    try {
      const response = await fetch(API_SLUG("/create"), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lenderId,
          initialAmount,
          availableAmount,
          interest,
          deadline,
          requirements,
          quotas,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error creating lending post');
      }
  
      const data = await response.json();
      return { lendingPostId: data.lendingPostId, createdRequirements: data.createdRequirements };
    } catch (error) {
      console.error('Error creating lending post:', error);
      throw error;
    }
};

 
// Example:
// localhost:3000/api/v1/lendingPost/ask?userId=b2a740c4-d47d-4117-860d-a0cd247038c8&lending_post_id=869aae17-fb91-411c-9a1c-cf59a329ca3e
export const askForLoan = async (userId: string, lendingPostId: string) => {
  try {
    const response = await fetch(API_SLUG(`/ask?userId=${userId}&lending_post_id=${lendingPostId}`), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al solicitar préstamo');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al solicitar préstamo:', error);
    throw error;
  }
};

// Example:
// localhost:3000/api/v1/lendingPost/asking?id=869aae17-fb91-411c-9a1c-cf59a329ca3e
export const getAsking = async (lendingPostId: string) => {
  try {
    const response = await fetch(API_SLUG(`/asking?id=${lendingPostId}`), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener solicitudes de préstamo');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener solicitudes de préstamo:', error);
    throw error;
  }
};
