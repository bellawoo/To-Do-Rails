class TasksController < ApplicationController
  def complete
    task = current_user.task.find params[:task_id]
    task.toggle_complete!
    render json: { status: :ok }
  end

  def create
    # Task.new(content: params[:task_name], list_id: params[:list_id])
    list = current_user.task.find params[:list_id]
    task = list.tasks.create! content: params[:task_name]
    render json: task
  end

  def destroy
    current_user.task.destroy params[:id]
    render json: { status: :ok }
  end
end