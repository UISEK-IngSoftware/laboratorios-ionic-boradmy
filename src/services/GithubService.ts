import axios from "axios";
import { Repository } from "../interfaces/Repository";
import { RepositoryPayload } from "../interfaces/RepositoryPayload";
import { GithubUser } from "../interfaces/GithubUser";
import AuthService from "./AuthService";

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL;

const githubApiClient = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    Authorization: AuthService.getAuthHeader() || "",
  },
});

// Obtener repositorios del usuario autenticado
export const fetchRepositories = async (): Promise<Repository[]> => {
  try {
    const response = await githubApiClient.get("/user/repos", {
      params: {
        per_page: 10,
        sort: "created",
        direction: "desc",
        affiliation: "owner",
        t: Date.now(),
      },
    });

    const data = response.data;

    if (Array.isArray(data)) {
      return data as Repository[];
    } else {
      // Mostrar mensaje real de GitHub si existe
      throw new Error(data?.message || "Respuesta inválida de GitHub");
    }
  } catch (error: any) {
    throw new Error("Error obteniendo repositorios: " + (error.message || error));
  }
};

// Crear repositorio
export const createRepository = async (
  repository: RepositoryPayload
): Promise<Repository | null> => {
  try {
    const response = await githubApiClient.post("/user/repos", repository);
    const data = response.data;
    if (data && data.id) {
      return data as Repository;
    }
    throw new Error(data?.message || "Respuesta inválida al crear repositorio");
  } catch (error: any) {
    throw new Error("Error creando repositorio: " + (error.message || error));
  }
};

// Obtener información del usuario
export const getUserInfo = async (): Promise<GithubUser | null> => {
  try {
    const response = await githubApiClient.get("/user");
    const data = response.data;
    if (data && data.login) {
      return data as GithubUser;
    }
    throw new Error(data?.message || "Respuesta inválida al obtener usuario");
  } catch (error: any) {
    throw new Error("Error obteniendo información del usuario: " + (error.message || error));
  }
};

// Actualizar repositorio
export const updateRepository = async (
  owner: string,
  repo: string,
  repository: RepositoryPayload
): Promise<Repository | null> => {
  try {
    const response = await githubApiClient.patch(`/repos/${owner}/${repo}`, {
      name: repository.name,
      description: repository.description || "",
    });

    const data = response.data;
    if (data && data.id) {
      return data as Repository;
    }
    throw new Error(data?.message || "Respuesta inválida al actualizar repositorio");
  } catch (error: any) {
    throw new Error("Error actualizando repositorio: " + (error.message || error));
  }
};

// Eliminar repositorio
export const deleteRepository = async (
  owner: string,
  repo: string
): Promise<void> => {
  try {
    const response = await githubApiClient.delete(`/repos/${owner}/${repo}`);
    if (!response.status || response.status >= 400) {
      throw new Error("Error eliminando repositorio");
    }
  } catch (error: any) {
    throw new Error("Error eliminando repositorio: " + (error.message || error));
  }
};
