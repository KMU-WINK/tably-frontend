import { useEffect } from 'react';

import { DialogHeader, DialogTitle } from '@/component/ui/dialog';

import { driver } from '@/constant/guide';
import { spaceModalDriver } from '@/constant/guide/space-modal';

import { Space } from '@/api/types/reservation';

import { useGuideStore } from '@/store/guide.store';

import { spaceName } from '@/lib/utils';

export interface SpaceModalProps {
  onSelect: (space: Space) => void;
}

export default function SpaceModal({ onSelect }: SpaceModalProps) {
  const { showGuide } = useGuideStore();

  useEffect(() => {
    if (!showGuide) return;

    driver.setConfig(spaceModalDriver);
    driver.drive();
  }, [showGuide]);

  return (
    <>
      <DialogHeader>
        <DialogTitle>공간 목록</DialogTitle>
      </DialogHeader>

      <div id="space-modal" className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <SpaceBlock space={Space.TABLE1} onSelect={onSelect} />
          <SpaceBlock space={Space.TABLE2} onSelect={onSelect} />
        </div>
        <div className="flex flex-row gap-4">
          <SpaceBlock space={Space.TABLE3} onSelect={onSelect} />
          <SpaceBlock space={Space.TABLE4} onSelect={onSelect} />
        </div>
        <div className="flex flex-row gap-4">
          <SpaceBlock space={Space.ROBOT_FIELD} onSelect={onSelect} />
        </div>
      </div>
    </>
  );
}

interface SpaceBlockProps {
  space: Space;
  onSelect: (space: Space) => void;
}

function SpaceBlock({ space, onSelect }: SpaceBlockProps) {
  return (
    <div
      id={`space-block-${space}`}
      className="flex w-full flex-1 cursor-pointer justify-center rounded-md border py-6 text-sm hover:bg-neutral-50 sm:text-base"
      onClick={() => {
        onSelect(space);
      }}
    >
      {spaceName(space)}
    </div>
  );
}
