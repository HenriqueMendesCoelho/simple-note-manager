import { mongoClient } from '../app/mongoClient/MongoClient.js';
import TopicController from './adapter/controller/TopicController.js';
import { TopicRepository } from './adapter/repository/TopicRepository.js';
import { CreateTopicUseCase } from './usecases/CreateTopicUseCase.js';
import { DeleteTopicUseCase } from './usecases/DeleteTopicUseCase.js';
import { FindTopicUseCase } from './usecases/FindTopicUseCase.js';
import { UpdateTopicUseCase } from './usecases/UpdateTopicUseCase.js';

const topicRepository = new TopicRepository(mongoClient);
const findTopicUseCase = new FindTopicUseCase(topicRepository);
const createTopicUseCase = new CreateTopicUseCase(topicRepository);
const updateTopicUseCase = new UpdateTopicUseCase(topicRepository);
const deleteTopicUseCase = new DeleteTopicUseCase(topicRepository);
const topicController = new TopicController(
  findTopicUseCase,
  createTopicUseCase,
  updateTopicUseCase,
  deleteTopicUseCase
);

export {
  topicRepository,
  findTopicUseCase,
  createTopicUseCase,
  updateTopicUseCase,
  deleteTopicUseCase,
  topicController,
};
