import axios from "axios";
import type { Taks } from "../types";

class Task {
  private server_api = import.meta.env.VITE_SERVER_ROOT_API;
  private token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MWZmNWZjZDhkMjQyNTQ0NGNkOGRmOCIsImlhdCI6MTc2NDQxNjY4M30.TZz6v7I6DGzBIGVZ3tze_RPzA9yfmiRd7NV0U9VbiJY";

  // get task
  async getAllTask() {
    const respnse = await axios.get(
      `${this.server_api}/task/api/v1/get-all-task`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
    if (respnse.status === 200) {
      console.log(respnse);
      return respnse.data;
    }
    if (respnse.status === 403) {
      return { msg: "no tasks availabel to dispay" };
    }
  }
  // create task
  async createTask(taskBody: Taks) {
    const response = await axios.post(
      `${this.server_api}/task/api/v1/create-task`,
      { ...taskBody },
      { headers: { Authorization: `Bearer ${this.token}` } }
    );

    if (response.status === 200) {
      return response.data;
    }
    if (response.status === 422) {
      return { message: "incorrect input" };
    }
    if (response.status === 409) {
      return { message: "task already exist" };
    }
  }
  // update task
  async updateTask(taskId: any) {
    const response = await axios.put(
      `${this.server_api}/task/api/v1/update-task/${taskId}`,
      { headers: { Authorization: `Bearer ${this.token}` } }
    );

    if (response.status === 200) {
      return response.data;
    }
    if (response.status === 404) {
      return { message: "task not available to update" };
    }
    if (response.status === 403) {
      return { message: "you are not authorized to update this task" };
    }
    if (response.status === 422) {
      return { message: "incorrect input" };
    }
  }
  // delete task
  async deleteTask(taskId: any) {
    const response = await axios.put(
      `${this.server_api}/task/api/v1/delete-task/${taskId}`,
      { headers: { Authorization: `Bearer ${this.token}` } }
    );

    if (response.status === 200) {
      return response;
    }
    if (response.status === 404) {
      return { message: "task not available to delete" };
    }
    if (response.status === 403) {
      return { message: "you are not authorized to delete this task" };
    }
    if (response.status === 402) {
      return { message: "params not provided" };
    }
  }
  // search task
  async seacrhTask(taskTitle: any) {
    const response = await axios.get(
      `${this.server_api}/task/api/v1/search-task/searchby?title=${taskTitle}`,
      { headers: { Authorization: `Bearer ${this.token}` } }
    );

    if (response.status === 404) {
      return { message: "No any task found" };
    }

    if (response.status === 402) {
      return { message: "Please provide title or description to search" };
    }
    if (response.status === 200) {
      return response.data;
    }
  }
  // get solo task stats
  async getTaskStats() {
    const response = await axios.get(
      `${this.server_api}/task/api/v1/task-stats`,
      { headers: { Authorization: `Bearer ${this.token}` } }
    );

    if (response.status === 404) {
      return { message: "No any task found" };
    }

    if (response.status === 200) {
      return response.data;
    }
  }
  // get recent task
  async getRecentTask() {
    const response = await axios.get(
      `${this.server_api}/task/api/v1/task-recents`,
      { headers: { Authorization: `Bearer ${this.token}` } }
    );

    if (response.status === 404) {
      return { message: "No any task found" };
    }

    if (response.status === 200) {
      return response.data;
    }
  }
  // get task activity
  async getTaskActivity(taskId: any) {
    const response = await axios.get(
      `${this.server_api}/task/api/v1/task-activity/${taskId}`,
      { headers: { Authorization: `Bearer ${this.token}` } }
    );

    if (response.status === 402) {
      return { message: "params not provided" };
    }
    if (response.status === 404) {
      return { message: "No any task found" };
    }

    if (response.status === 200) {
      return response.data;
    }
  }
  // get task activity
  async getSpecificTask(taskId: any) {
    const response = await axios.get(
      `${this.server_api}/task/api/v1/get-specific-task/${taskId}`,
      { headers: { Authorization: `Bearer ${this.token}` } }
    );

    if (response.status === 404) {
      return { message: "No any task found" };
    }

    if (response.status === 200) {
      return response.data;
    }
  }

  // ----- solo ----
  // get task  //done
  // creat task  //done
  // update task //done
  // delete task  //done
  // search task //done
  // get task stats //done
  // get task acticity //done
  // get recent task //done
  // get specific task  //done
  // filter by status task
  // filter by both
  // filter by priority task
  // delete all task                                  --- end point is yet to build
  // ----- team ----
  // get all tasks of team
  // get specific task of team
  // delete task of team
  // delete all task of team                           --- end point is yet to build
  // get team task stats
  // get team task recent
  // create team task
  // update team task
  // assign team task
  // un-assign team task
}

export const tasksApies = new Task();
