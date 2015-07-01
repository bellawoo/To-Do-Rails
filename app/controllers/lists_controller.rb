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
    @list = List.new(
      name: params[:name]
      )
    if @list.save
      redirect_to list_path(@list), notice: "List created"
    else
      render :new
    end
  end
end