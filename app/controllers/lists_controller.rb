class ListsController < ApplicationController
  def index
    @lists = current_user.list.all  
  end

  def show
    @list = current_user.list.find params[:id]
  end

  def new
    @list = current_user.list.new
  end

  def create
    @list = current_user.list.new(
      name: params[:name]
      )
    if @list.save
      redirect_to list_path(@list), notice: "List created"
    else
      render :new
    end
  end
end