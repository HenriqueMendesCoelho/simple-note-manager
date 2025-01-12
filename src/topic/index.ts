import { mongoClient } from '../app/mongoClient/index.js';

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

let topicRepository: TopicRepository;
let createTopicUseCase: CreateTopicUseCase;
let findTopicUseCase: FindTopicUseCase;
let updateTopicUseCase: UpdateTopicUseCase;
let deleteTopicUseCase: DeleteTopicUseCase;

let topicNoteRepository: TopicNoteRepository;
let createTopicNoteUseCase: CreateTopicNoteUseCase;
let findTopicNoteUseCase: FindTopicNoteUseCase;
let updateTopicNoteUseCase: UpdateTopicNoteUseCase;
let deleteTopicNoteUseCase: DeleteTopicNoteUseCase;

let topicController: TopicController;

function initializeTopicDependencies() {
  topicRepository = new TopicRepository(mongoClient);
  createTopicUseCase = new CreateTopicUseCase(topicRepository);
  findTopicUseCase = new FindTopicUseCase(topicRepository);
  updateTopicUseCase = new UpdateTopicUseCase(topicRepository);
  deleteTopicUseCase = new DeleteTopicUseCase(topicRepository);

  topicNoteRepository = new TopicNoteRepository(mongoClient);
  createTopicNoteUseCase = new CreateTopicNoteUseCase(topicNoteRepository, topicRepository);
  findTopicNoteUseCase = new FindTopicNoteUseCase(topicNoteRepository);
  updateTopicNoteUseCase = new UpdateTopicNoteUseCase(topicNoteRepository);
  deleteTopicNoteUseCase = new DeleteTopicNoteUseCase(topicNoteRepository);

  topicController = new TopicController(
    createTopicUseCase,
    findTopicUseCase,
    updateTopicUseCase,
    deleteTopicUseCase,
    createTopicNoteUseCase,
    findTopicNoteUseCase,
    updateTopicNoteUseCase,
    deleteTopicNoteUseCase
  );
}

export { topicRepository, findTopicUseCase, createTopicUseCase, updateTopicUseCase, deleteTopicUseCase };
export { topicNoteRepository, findTopicNoteUseCase, createTopicNoteUseCase, updateTopicNoteUseCase, deleteTopicNoteUseCase };
export { topicController, initializeTopicDependencies };
