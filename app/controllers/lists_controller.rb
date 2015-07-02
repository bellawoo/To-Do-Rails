class ListsController < ApplicationController
  def index
    @lists = List.all  
  end

  def show
    @list = List.find params[:id]
  end

  def new
    @list = List.new
  end

  def create
    @list = List.new name: params[:list_name], user_id: current_user.id
    @list.save!
    render json: @list
  end
end