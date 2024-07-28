import { mongoClient } from '../app/mongoClient/MongoClient.js';

import { TopicRepository } from './adapter/repository/TopicRepository.js';
import { FindTopicNoteUseCase } from './usecases/FindTopicNoteUseCase.js';
import { CreateTopicNoteUseCase } from './usecases/CreateTopicNoteUseCase.js';
import { UpdateTopicNoteUseCase } from './usecases/UpdateTopicNoteUseCase.js';
import { DeleteTopicNoteUseCase } from './usecases/DeleteTopicNoteUseCase.js';

import { TopicNoteRepository } from './adapter/repository/TopicNoteRepository.js';
import { FindTopicUseCase } from './usecases/FindTopicUseCase.js';
import { CreateTopicUseCase } from './usecases/CreateTopicUseCase.js';
import { UpdateTopicUseCase } from './usecases/UpdateTopicUseCase.js';
import { DeleteTopicUseCase } from './usecases/DeleteTopicUseCase.js';

import TopicController from './adapter/controller/TopicController.js';

const topicRepository = new TopicRepository(mongoClient);
const createTopicUseCase = new CreateTopicUseCase(topicRepository);
const findTopicUseCase = new FindTopicUseCase(topicRepository);
const updateTopicUseCase = new UpdateTopicUseCase(topicRepository);
const deleteTopicUseCase = new DeleteTopicUseCase(topicRepository);

const topicNoteRepository = new TopicNoteRepository(mongoClient);
const createTopicNoteUseCase = new CreateTopicNoteUseCase(topicNoteRepository, topicRepository);
const findTopicNoteUseCase = new FindTopicNoteUseCase(topicNoteRepository);
const updateTopicNoteUseCase = new UpdateTopicNoteUseCase(topicNoteRepository);
const deleteTopicNoteUseCase = new DeleteTopicNoteUseCase(topicNoteRepository);

export const topicController = new TopicController(
  createTopicUseCase,
  findTopicUseCase,
  updateTopicUseCase,
  deleteTopicUseCase,
  createTopicNoteUseCase,
  findTopicNoteUseCase,
  updateTopicNoteUseCase,
  deleteTopicNoteUseCase
);

export { topicRepository, findTopicUseCase, createTopicUseCase, updateTopicUseCase, deleteTopicUseCase };
export { topicNoteRepository, findTopicNoteUseCase, createTopicNoteUseCase, updateTopicNoteUseCase, deleteTopicNoteUseCase };
