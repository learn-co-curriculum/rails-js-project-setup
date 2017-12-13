class Api::V1::CommentsController < ApplicationController
  def create
    note = Note.find(params[:note_id])
    comment = note.comments.build(comment_params)
    if comment.save
      render json: comment, status: 201
    end       
  end

  private
    def comment_params
      params.permit(:content)
    end
end
