import { letterGridColumnCount } from "~/lib/constants/sizes";
import { Letter, LetterPosition, useGetLetters } from "~/services/queries/letterQueries";
import { Nullable, TLetterChart, TLetterTypeName } from "~/types";

export const useLetterChart = () => {
    const { data: letterData = { letterBlocks: [], letterPositions: [], letters: [], letterTypes: [] }, ...queryReturn } = useGetLetters();

    const getLetterChart = (params: { type: TLetterTypeName; block: string }) => {
        const chartType = letterData.letterTypes.find((type) => type.name === params.type);

        const basicBlock = letterData.letterBlocks.find((type) => type.name === params.block);

        if (!chartType) {
            return [];
        }

        if (!basicBlock) {
            return [];
        }

        const letterPositions: Map<LetterPosition["id"], LetterPosition> = new Map(letterData.letterPositions.map((posision) => [posision.id, posision]));

        const chartData: Array<Letter & { posision: LetterPosition }> = letterData.letters
            .filter((letter) => letter.type_id === chartType.id)
            .map((letter) => {
                const posision = letterPositions.get(letter.position_id);

                const data: Nullable<Letter & { posision: LetterPosition }> = posision ? { posision, ...letter } : null;

                return data;
            })
            .filter((letter) => letter !== null);

        return buildLetterChart(basicBlock.id, chartData);
    };

    return { getLetterChart, letterData, ...queryReturn };
};

const buildLetterChart = (blockId: string, letterChatItems: Array<Letter & { posision: LetterPosition }>) => {
    const items = letterChatItems.filter((letter) => letter.block_id === blockId);

    const maxRow = Math.max(...items.map((item) => item.posision.row));

    const data: TLetterChart = Array.from({ length: maxRow + 1 }, () => Array.from({ length: letterGridColumnCount }, () => null));

    items.forEach(({ posision, ...letter }) => {
        data[posision.row][posision.column] = letter;
    });

    return data;
};
