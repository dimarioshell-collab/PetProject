import * as THREE from 'three';
import System, { Emitter, SpriteRenderer /* … */ } from 'three-nebula';
import { run } from '/common/run.js';

const init = async ({ scene, camera, renderer }) => {
  const system = new System();
  // … set up emitters, initializers and behaviours …
  return system.addRenderer(new SpriteRenderer(scene, THREE));
};

run(init);
