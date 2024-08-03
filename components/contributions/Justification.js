
import {Likert} from "@/components/contributions/Likert";
import BadSelection from "@/components/contributions/BadSelection";
import { HStack, VStack, SimpleGrid } from "@chakra-ui/react";
import React, { useState } from "react";
import ImprovedAnswer from "@/components/contributions/ImprovedAnswer";

export default function Justification({ vote, handleBadTag, badTags, likert, updateLikert, improvedAnswer, onSubmit}) {
  return (
    <>
    {vote === "1" ? (
      <SimpleGrid columns={[1, null, 2]} spacing="4" w="100%" h="fit-content">
        <Likert likert={likert} updateLikert={updateLikert}/>
        <VStack w="100%" h="fit-content" spacing="4" justifyContent="flex-start" alignItems="flex-start">
          <BadSelection handleChange={handleBadTag} tags={badTags}/>
          <ImprovedAnswer 
            improvedAnswer={improvedAnswer} 
            onSubmit={onSubmit} 
          />
        </VStack>
      </SimpleGrid>
    ) : (
      <SimpleGrid columns={[1, null, 2]} spacing="4" w="100%" h="fit-content">
        <VStack w="100%" h="fit-content" spacing="4" justifyContent="flex-start" alignItems="flex-start">
          <BadSelection handleChange={handleBadTag} tags={badTags}/>
          <ImprovedAnswer 
            improvedAnswer={improvedAnswer} 
            onSubmit={onSubmit} 
          />
        </VStack>
        <Likert likert={likert} updateLikert={updateLikert} />
        </SimpleGrid>
    )}
    </>
  );
}