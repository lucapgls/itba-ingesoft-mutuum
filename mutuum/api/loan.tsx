import API_BASE_URL from "./api_temp"

export const fetchLoans = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/loan`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
  
      if (!response.ok) {
        throw new Error('Error al obtener préstamos');
      }
      
      const data = await response.json();
      console.log(data.loans);
      return data.loans;
    } catch (error) {
      console.error('Error al obtener préstamos:', error);
      throw error;
    }
  };
  
  export const fetchLoanRequirements = async (lendingPostId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/loan/requirements/${lendingPostId}`, {
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
      console.error('Error al obtener los requisitos del préstamo:', error);
      throw error;
    }
  };

  export const fetchLoansByUserId = async (userId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/loan/${userId}`, {
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
  
  
  export const createLendingPostAndRequirements = async (
    lenderId: string,
    initialAmount: number,
    availableAmount: number,
    interest: number,
    deadline: string,
    requirements: Array<{ name: string; completed: boolean }>
  ) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/loan`, {
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
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error al crear el préstamo');
      }
  
      const data = await response.json();
      return { lendingPostId: data.lendingPostId, createdRequirements: data.createdRequirements };
    } catch (error) {
      console.error('Error al crear el préstamo:', error);
      throw error;
    }
};