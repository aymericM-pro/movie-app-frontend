<script lang="ts" setup>
import { computed } from 'vue';

type RangeValue = [number, number];

const props = defineProps<{
    modelValue: number | RangeValue;
    min: number;
    max: number;
    step?: number;
    label?: string;
    mode?: 'single' | 'range';
}>();

const emit =
    defineEmits<(e: 'update:modelValue', value: number | RangeValue) => void>();

const isRange = computed(() => props.mode !== 'single');

const rangeValue = computed<RangeValue>(() => {
    if (Array.isArray(props.modelValue)) return props.modelValue;
    return [props.min, props.modelValue as number];
});

const left = computed(
    () => ((rangeValue.value[0] - props.min) / (props.max - props.min)) * 100,
);

const right = computed(
    () => ((rangeValue.value[1] - props.min) / (props.max - props.min)) * 100,
);

const updateMin = (value: number) => {
    emit('update:modelValue', [
        Math.min(value, rangeValue.value[1]),
        rangeValue.value[1],
    ]);
};

const updateMax = (value: number) => {
    emit('update:modelValue', [
        rangeValue.value[0],
        Math.max(value, rangeValue.value[0]),
    ]);
};

const singleValue = computed<number>({
    get: () =>
        Array.isArray(props.modelValue)
            ? props.modelValue[1]
            : props.modelValue,
    set: (v) => emit('update:modelValue', v),
});
</script>

<template>
    <div class="space-y-3">
        <p v-if="label" class="text-sm font-semibold text-white">
            {{ label }}
        </p>

        <!-- ================= RANGE MODE ================= -->
        <div v-if="isRange" class="relative h-6">
            <!-- rail -->
            <div
                class="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded bg-white/20"
            />

            <!-- active -->
            <div
                :style="{ left: `${left}%`, width: `${right - left}%` }"
                class="absolute top-1/2 h-1 -translate-y-1/2 rounded bg-[var(--primary)]"
            />

            <!-- min -->
            <input
                :max="max"
                :min="min"
                :step="step || 1"
                :value="rangeValue[0]"
                class="range-input absolute inset-0 z-10"
                type="range"
                @input="updateMin(+($event.target as HTMLInputElement).value)"
            />

            <!-- max -->
            <input
                :max="max"
                :min="min"
                :step="step || 1"
                :value="rangeValue[1]"
                class="range-input absolute inset-0 z-20"
                type="range"
                @input="updateMax(+($event.target as HTMLInputElement).value)"
            />
        </div>

        <!-- ================= SINGLE MODE ================= -->
        <div v-else class="relative h-6">
            <div
                class="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded bg-white/20"
            />
            <div
                :style="{
                    width: ((singleValue - min) / (max - min)) * 100 + '%',
                }"
                class="absolute top-1/2 h-1 -translate-y-1/2 rounded bg-[var(--primary)]"
            />

            <input
                v-model="singleValue"
                :max="max"
                :min="min"
                :step="step || 1"
                class="range-input absolute inset-0 z-10"
                type="range"
            />
        </div>

        <!-- values -->
        <div class="flex justify-between text-xs text-white/60">
            <span>{{ isRange ? rangeValue[0] : min }}</span>
            <span>{{ isRange ? rangeValue[1] : singleValue }}</span>
        </div>
    </div>
</template>

<style scoped>
.range-input {
    pointer-events: none;
    appearance: none;
    background: none;
}

.range-input::-webkit-slider-thumb {
    pointer-events: auto;
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 9999px;
    background: var(--primary);
    cursor: pointer;
}
</style>
