class Api::V1::CommentsController < ApplicationController
  def create
    note = Note.find(params[:note_id])
    comment = note.comments.build(comment_params)
    if comment.save
      render json: comment, status: 201
    end       
  end

  def destroy
    note = Note.find(params[:note_id])
    comment = note.comments.find(params[:id])
    if comment.destroy
      render json: {commentId: comment.id}, status: 200
    end
  end

  def update
    note = Note.find(params[:note_id])
    comment = note.comments.find(params[:id])

    if comment.update(comment_params)
      render json: comment, status: 200
    end
  end

  private
    def comment_params
      params.permit(:content)
    end
end
