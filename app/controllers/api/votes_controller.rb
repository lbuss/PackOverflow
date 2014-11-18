module Api
  class VotesController < ApiController
    def new
    end
    
    def create
      @vote = current_user.votes.new(vote_params)
      if @vote.save
        render json: @vote
      else
        render json: @vote.errors.full_messages, status: :unprocessable_entity
      end
    end

    def update
      @vote = current_user.votes.find(params[:id])
      if @vote.update_attributes(vote_params)
        render json: @vote
      else
        render json: @vote.errors.full_messages, status: :unprocessable_entity
      end      
    end

    def destroy
      @vote = current_user.votes.find(params[:id])
      @vote.try(:destroy)
      render json: {}
    end

    def index
      #should return top votes
      @votes = Vote.all
      render json: @votes
    end

    def show
     #.includes(:votes, lists: :votes)
      @vote = Vote.find(params[:id])
      if @vote
        render json: @vote
      else
        render json: ["Vote not found"], status: 404
      end
    end

    private

    def vote_params
      params.require(:vote).permit(:votable_id, :votable_type, :value)
    end
  end
end