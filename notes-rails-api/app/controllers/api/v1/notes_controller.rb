class Api::V1::NotesController < ApplicationController

  def index
    @notes = Note.order(:created_at)
    render json: @notes, status: 200
  end

  def create
    @note = Note.create(note_params)
    render json: @note, status: 201
  end
  
  def destroy
    note = Note.find(params[:id])
    if note.destroy
      render json: {noteId: note.id}, status: 200
    end
  end
  
  def update
    @note = Note.find(params[:id])
    if @note.update(note_params)
      render json: @note, status: 200
    end
  end

  private
    def note_params
      params.require(:note).permit(:body)
    end
end
