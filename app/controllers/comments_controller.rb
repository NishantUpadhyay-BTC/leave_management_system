class CommentsController < ApplicationController
  def new
  end

  def create
    @sign_off = SignOff.find(params[:sign_off_id])
    @comment = @sign_off.comments.build(user_id: current_user.id, message: params[:comment][:message])
    if @comment.save
      respond_to do |format|
        format.json { render json: { comment: @comment, success: true } }
      end
    else
      respond_to do |format|
        format.json { render json: { errors: @comment.errors, success: false } }
      end
    end
  end
end
